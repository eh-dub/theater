export function *script() {
  let line = "How might we store product ranks in a relational database";
  yield {products: [{id:1, rank:2}], dialouge: line, buttonText: "Put it in the database!"};
}