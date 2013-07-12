# <%= moduleName %> images folder

The images folder will hold all the images that are needed to build the <%= moduleName %> module. Notice that the `nglue` json file includes by default moving all the files from the images folder.
By specifying the actual images you want to move, you can ensure you wont move files that are not needed and are used to build the component, such as psd source files.

{
  "version": "0.0.0",
  "name": "<%= moduleName %>-module",
  "dependencies": {
  },
  "copy": {
    "images": "assets/images"
  }
}

When you are ready to create an app in your <%= projectName %> project that include at least two modules, Grunt will glue together all these images together to create a file that includes all these libraries from all the modules you includes.