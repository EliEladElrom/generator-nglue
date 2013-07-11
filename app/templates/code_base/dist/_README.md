# <%= _.slugify(projectName) %>

There are two `dist` folders:

1) code_base/dist
2) dist

The reason we maintain two dist folder is that we are gluing re-usable components and we are not trying to tell you exactly how to work,
just giving you tools to help.  For instance, you can glue few modules together and than take that app and move it to an existing project or
you may turn these apps into a website or a mobile application and you will need another step moving from glued modules to an actual site.

# Project dist folder

The dist folder under the main project is intended to be used to create a complete application.
This is were you would write your own specific code and deployment tasks,
it should be specific to exactly what you're doing and that's why we didn't include any grunt tasks or
 `yo` commands.

#  code_base/dist folder

The `code_base/dist` is there to be able to build your code_base,
and as such grunt tasks will build into that folder.
The grunt tasks includes concatenating and minifies files, compiling less files and other common tasks.

