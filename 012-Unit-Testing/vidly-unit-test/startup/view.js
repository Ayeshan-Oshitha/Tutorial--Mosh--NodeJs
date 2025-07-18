function view(app) {
  app.set("view engine", "pug");
  app.set("views", "./views");

  app.get("/", (req, res) => {
    res.render("index", {
      title: "Vidly",
      heading: "Vidly App",
      message: "Welcome to the vidly application",
    });
  });
}

module.exports = view;
