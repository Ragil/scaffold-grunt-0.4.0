module.exports = function(grunt) {

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    clean : {
      tmp : ['tmp'],
      cover : ['cover'],
      dist : ['dist']
    },

    jshint : {
      all : ['Gruntfile.js', 'app/**/*.js', 'test/spec/**/*.js'],
      options : {
        browser : true,
        laxbreak : true,
        curly : true,
        eqeqeq : true,
        immed : true,
        latedef : true,
        newcap : true,
        noarg : true,
        sub : true,
        boss : true,
        eqnull : true
      }
    },

    mocha : {
      index : ['test/index.html']
    },

    less : {
      uncompressed : {
        options : {
          paths : ['components/bootstrap/less', 'components/less-elements']
        },
        files : {
          'dist/local/css/app.css' : 'app/view/MainView.less'
        }
      }
    },

    requirejs: {
      local : {
        options : {
          almond : true,
          include : 'config.js',
          baseUrl : 'app/',
          mainConfigFile : 'app/config.js',
          out : 'dist/local/js/app.js',
          optimize : 'none'
        },
        path : {
          env : 'app/env/local.js'
        }
      }
    },

    index : {
      local : {
        src : 'index.html',
        dest : 'dist/local/index.html',
        data : {
          css : 'app',
          js : 'app'
        }
      }
    }

  });

  grunt.loadTasks('grunt-lib');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('compile', ['clean', 'jshint', 'mocha',
      'less:uncompressed', 'index:local']);
  grunt.registerTask('dist:local', ['compile', 'requirejs:local']);
  grunt.registerTask('default', ['dist:local']);

};
