const postModel = require("../models/postsSchema");

export function createPost(post) {
  const post = new postModel(post);
  return post.save()
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
