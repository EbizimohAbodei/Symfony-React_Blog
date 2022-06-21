import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import axios from "axios";

const CreateArticle = () => {
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [post, setPost] = useState("");

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("author", author);
    formData.append("subject", subject);
    formData.append("post", post);
    axios
      .post("/blog/create", formData)
      .then((res) =>
        Swal.fire({
          icon: "success",
          title: "Article posted successfully",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log("some kind of error occurred: ", err))
      .finally(() => {
        setAuthor(" ");
        setPost(" ");
        setSubject(" ");
      });
  };

  return (
    <div>
      <Header />
      <div className="addNewContainer">
        <form className="formContainer">
          <h2 className="createTitle">Create Blog Article</h2>
          <div className="inputContainer">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={subject}
              required
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="author">Author:</label>
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
          <div className="inputContainer">
            <label htmlFor="Post">Content:</label>
            <textarea
              type="text"
              name="Post"
              id="Post"
              rows="10"
              cols="20"
              value={post}
              required
              onChange={(e) => {
                setPost(e.target.value);
              }}
            />
          </div>
          <button type="button" className="submitPostBtn" onClick={submit}>
            Post Article
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateArticle;
