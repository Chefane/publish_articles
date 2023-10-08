import React from "react";
import Image from "next/image";

const LoginForm = () => {
  return (
    <>
      <div className="card mb-4" style={{ width: "100%" }}>
        <div style={{ position: "relative", width: "60%", height: "200px" }}>
          <Image
            src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2019/08/August-blog-header-Amplification.png"
            alt="Sample Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">Design a Wordle Python Helper</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Author: John Clark Craig
          </h6>
          <p className="card-text">
            In a nutshell, you guess 5-letter words, and the program color-codes
            the results to let you know how close you are to finding the right
            word. A dark-gray background marks letters that don’t appear
            anywhere in the target word. Yellow means the letter is in the word,
            but in the wrong place, and green means the letter is exactly in the
            right spot. You get six tries, and if you’re careful, and have a
            whole bunch of 5-letter words in your head, you can almost always
            find the solution!
          </p>
          <a href="#" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
