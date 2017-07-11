module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      pug: {
        files: ['app/views/**/*.pug'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**.js', 'app/models/*.js', 'app/schemas/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'public/stylesheets/**/*.sass',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
  },
    },
      // uglify: {
      //   files: ['public/**/*.js'],
      //   tasks: ['jshint'],
      //   options: {
      //     livereload: true
      //   }
      // },
      //   styles: {
      //     files: ['public/**/*.sass'],
      //     tasks: ['sass'],
      //     options: {
      //       nospawn: true
      //     }
      //   }
      // },
    //   compass: {                  // Task 
    //     dist: {                   // Target 
    //       options: {              // Target options 
    //         sassDir: 'public/stylesheets/sass/**/*.sass',
    //         cssDir: 'public/stylesheets/style.css',
    //         environment: 'production'
    //       }
    //   }
    // },

    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc',
    //     ignores: ['public/libs/**/*.js']
    //   },
    //   all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
    // },

    

    // uglify: {
    //   development: {
    //     files: {
    //       'public/build/admin.min.js': 'public/js/admin.js',
    //       'public/build/detail.min.js': [
    //         'public/js/detail.js'
    //       ]
    //     }
    //   }
    // },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    // mochaTest: {
    //   options: {
    //     reporter: 'spec'
    //   },
    //   src: ['test/**/*.js']
    // },

    // concurrent: {
    //   tasks: ['nodemon', 'watch', 'compass'],
    //   options: {
    //     logConcurrentOutput: true
    //   }
    // }
  })

  // grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  // grunt.loadNpmTasks('grunt-concurrent')
  // grunt.loadNpmTasks('grunt-mocha-test')
  // grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.option('force', true)

  // grunt.registerTask('default', ['concurrent'])
  grunt.registerTask('default', ['nodemon','watch'])
  // grunt.registerTask('test', ['mochaTest'])
}