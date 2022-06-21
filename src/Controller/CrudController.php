<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Entity\BlogPost;
use App\Entity\PostComments;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route("/blog", name:"blog_crud")]
class CrudController extends AbstractController
{
    #[Route('/articles', name: 'articles', methods:["GET"])]
    public function index(EntityManagerInterface $em): Response
    {
        $blogs = $em->getRepository(BlogPost::class)->findAll();
        $data = [];

        foreach ($blogs as $blog) {
            $data[] = [
                'id' => $blog->getId(),
                'author' => $blog->getAuthor(),
                'subject' => $blog->getSubject(),
                'post' => $blog->getPost(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/create', name: 'create_Article', methods:["POST"])]   
    public function newArticle(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $blog = new BlogPost();
        $blog->setSubject($request->request->get("subject"));
        $blog->setAuthor($request->request->get("author"));
        $blog->setPost($request->request->get("post"));
        $em->persist($blog);
        $em->flush();

        if ($blog == []) {
            echo "All input fields are required";
            exit;
        }

        return $this->json("Created new article with an id of: " . $blog->getId());
    } 

    #[Route('/delete/{id}', name: 'delete_article', methods:['DELETE'])]
    public function delete(int $id, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $deleteItem =$em->getRepository(BlogPost::class)->find($id);

        if (!$deleteItem){
            return $this->json('No Article found with this id ' . $id, 404);
        }

        $em->remove($deleteItem);
        $em->flush();

        return $this->json('Deleted a project successfully with id ' . $id);
    }

    #[Route('/comment/{id}', name: 'article_comment', methods:['POST'])]   
    public function newComment(int $id, Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $postId = $em->getRepository(BlogPost::class)->find($id);
        $comment = new PostComments();
        $comment->setAuthor($request->request->get("author"));
        $comment->setBlogPost($postId);
        $comment->setComments($request->request->get("comment"));
        $em->persist($comment);
        $em->flush();

        if (!$comment) {
            echo "Some kind of error occured";
            exit;
        };


        return $this->json("Created new comment with an id of: " . $comment->getId());
    } 


    #[Route('/comment/{id}', name: 'show_comments', methods:['GET'])]
    public function showComments(int $id, ManagerRegistry $doctrine): Response
    {
        $article = $doctrine->getRepository(BlogPost::class)->find($id);
        $comments = $article->getComments();

        if (!$article) {
            return $this->json("No blog found for id: " . $id, 404);
        }

        $allComments = [];

        foreach ($comments as $comment) {
            $oneComment = ["id" => $comment->getId(), "author" => $comment->getAuthor(), "comment" => $comment->getComments()];
            array_push($allComments, $oneComment);
        }

        $data = [
            'id' => $article->getId(),
            'title' => $article->getSubject(),
            'author' => $article->getAuthor(),
            'article' => $article->getPost(),
            'comments' => $allComments,
        ];

        return $this->json($data);
    }
}