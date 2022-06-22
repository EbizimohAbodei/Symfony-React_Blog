import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

const Main = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios
      .get("/blog/articles")
      .then((response) => {
        setArticleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeComment = (id) => {
    let formData = new FormData();
    formData.append("author", author);
    formData.append("comment", comment);
    axios
      .post("/blog/comment/" + id, formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Comment added to Article",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Some kind of error occured");
      })
      .finally(() => {
        setAuthor(" ");
        setComment(" ");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Sure you want to delete this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, please delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/blog/delete/" + id)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Article was deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchArticles();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete was unsuccessful",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const showComments = (id) => {
    setShowCommentModal(!showCommentModal);
    axios.get("blog/comment/" + id).then((response) => {
      setArticleComments(response.data.comments);
    });
  };

  const closeModal = () => {
    setShowCommentModal(!showCommentModal);
  };

  const outsideClick = () => {
    if (showCommentModal) {
      setShowCommentModal(!showCommentModal);
    }
  };

  return (
    <main onClick={outsideClick}>
      {articleList.map((article) => {
        return (
          <div className="mainContainer" key={article.id}>
            <h1>
              {article.subject} by {article.author}
            </h1>
            <p>{article.post}</p>
            <div className="numberOfComments">
              <button
                onClick={(e) => {
                  showComments(article.id), e.stopPropagation();
                }}
              >
                View Comments
              </button>
            </div>
            {showCommentModal && (
              <div className="commentsModal">
                {articleComments.length > 0 ? (
                  <div>
                    <AiFillCloseCircle
                      className="closeModalBtn"
                      onClick={closeModal}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="noComments">No comments on this article</h3>
                  </div>
                )}
                {articleComments.map((comment) => {
                  return (
                    <div className="comment" key={comment.id}>
                      <h3>Comment by: {comment.author}</h3>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <div className="commentAuthorCont">
                <label htmlFor="author">Comment by:</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={author}
                  required
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </div>
              <div>
                <div>
                  <label htmlFor="author">Message:</label>
                </div>
                <textarea
                  id="commentInput"
                  name="commentInput"
                  rows="4"
                  value={comment}
                  required
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  className="commentBtn"
                  type="button"
                  onClick={() => makeComment(article.id)}
                >
                  Post Comment
                </button>
              </div>
              <button
                onClick={() => handleDelete(article.id)}
                className="deleteBtn"
              >
                Delete Article
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Main;
