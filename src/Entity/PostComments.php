<?php

namespace App\Entity;

use App\Repository\PostCommentsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostCommentsRepository::class)]
class PostComments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 1000, nullable: true)]
    private $Comments;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $Author;

    #[ORM\ManyToOne(targetEntity: BlogPost::class, inversedBy: 'Comments')]
    #[ORM\JoinColumn(nullable: false)]
    private $BlogPost;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComments(): ?string
    {
        return $this->Comments;
    }

    public function setComments(?string $Comments): self
    {
        $this->Comments = $Comments;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->Author;
    }

    public function setAuthor(?string $Author): self
    {
        $this->Author = $Author;

        return $this;
    }

    public function getBlogPost(): ?BlogPost
    {
        return $this->BlogPost;
    }

    public function setBlogPost(?BlogPost $BlogPost): self
    {
        $this->BlogPost = $BlogPost;

        return $this;
    }
}
