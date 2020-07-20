# Hello P5

Hello! This is a [demo](https://hello.p5js.org/) showing some of the features of [p5.js library](https://github.com/processing/p5.js). p5.js is a JavaScript library that starts with the original goal of Processing, to make coding accessible for artists, designers, educators, and beginners, and reinterprets this for today's web.

Design and development of this demo was lead by [Scott Garner](http://scott.j38.net/) with input and contributions from [Dan Shiffman](http://shiffman.net/) and support from [NYU ITP](http://itp.nyu.edu). Demo sketches were written by **Dan** and **Scott**.

> [p5.js](http://p5js.org/) is developed by Lauren McCarthy and other [contributors](http://p5js.org/site/development> /#contributors) with the support of the [Processing Foundation](http://processing.org/) and [NYU ITP](http://itp.nyu.edu).

## Technologies Used 

 - [Jekyll](https://jekyllrb.com/) is used for deployment on Github at **gh-pages** branch.
 
 - [Popcorn.js](http://popcornjs.org/), part of Mozilla's [Popcorn Project](https://popcorn.webmaker.org/), is used to trigger Javascript events in sync with the video.
 
 - Realtime compositing of the presenters is done with [Seriously.js](http://seriouslyjs.org/), created by Brian Chirls with support from Mozilla.
 
- [Twitter Bootstrap](http://getbootstrap.com), a popular CSS framework, is used for designing.

- [jQuery](http://jquery.com), a javascript library, is used for things like HTML document traversal and manipulation, event handling, animation etc.

- Icons are from Dave Gandy's [Font Awesome](http://fontawesome.io/).

# Creating a pull request

When you create a [pull request](https://help.github.com/articles/creating-a-pull-request/) for a new fix or feature, be sure to mention the issue number for what you're working on. The best way to do it is to mention the issue like this at the top of your description:

    Fixes #333

The issue number in this case is "333." The word *Fixes* is magical; GitHub will automatically close the issue when your pull request is merged.

# Writing commit messages

Good commit messages serve at least three important purposes:

* They speed up the reviewing process.
* They help us write good release notes.
* They help future maintainers understand your change and the reasons behind it.

Structure your commit message like this:

 ```
 Short (50 chars or less) summary of changes ( involving Fixes #Issue-number keyword )

 More detailed explanatory text, if necessary. Wrap it to about 72
 characters or so. In some contexts, the first line is treated as the
 subject of an email and the rest of the text as the body. The blank
 line separating the summary from the body is critical (unless you omit
 the body entirely); tools like rebase can get confused if you run the
 two together.

 Further paragraphs come after blank lines.

   - Bullet points are okay, too

   - Typically a hyphen or asterisk is used for the bullet, preceded by a
     single space, with blank lines in between, but conventions vary here
 ```

* Write the summary line and description of what you have done in the imperative mode, that is as if you were commanding someone. Start the line with "Fix", "Add", "Change" instead of "Fixed", "Added", "Changed".
* Always leave the second line blank.
* Be as descriptive as possible in the description. It helps reasoning about the intention of commits and gives more context about why changes happened.

Tips
----

* If it seems difficult to summarize what your commit does, it may be because it includes several logical changes or bug fixes, and are better split up into several commits using `git add -p`.
