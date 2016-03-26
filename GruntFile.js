module.exports = function(grunt)
{       
    var globalFileList = "";    
    grunt.initConfig({        
        pkg : grunt.file.readJSON('package.json'),
        jshint: 
        {
            options:{reporter:require('jshint-stylish')},
            build: ['GruntFile.js','app.js','app/**/*.js']
        },
        uglify:
        {
          options:{banner:'/*\n<%=pkg.name%>  <%=grunt.template.today("yyyy-mm-dd")%>\n*/\n'},         
         // build: {files:[{dest:'source/js/allservice.js',src:['app/shared/authservice.js', 'app/shared/flash.service.js','app/shared/httpinterceptor.service.js','app/shared/userservice.js']},
          //      {dest:'source/js/controllers.js',src:globalFileList}]}
        },
        watch:
        {
            scripts: {
                files:'app/**/*.js',tasks:['jshint','uglify']
            }
        }            
    });
    
    grunt.registerTask('setValuesTask', 'set the js files to complie', function(){
        var buildConfig = grunt.file.readJSON('config.json');
        var fileList = [];
         var done = this.async();
         var count = 0;         
        buildConfig.forEach(function(modules){
            if(modules.jsFiles && modules.pckInclude)
            {
                modules.jsFiles.forEach(function(file){
                   fileList.push(file);
                });
            }
            else
            {            
                if(modules.moduleName == "LastIndex")
                {   
                    grunt.config.set('uglify.build', {files:[{dest:'source/js/allservice.js',src:['app/shared/authservice.js', 'app/shared/flash.service.js','app/shared/httpinterceptor.service.js','app/shared/userservice.js']},
                    {dest:'source/js/controllers.js',src:fileList}]});
                    grunt.log.writeln(fileList);
                    done();                
                }
            }  
        });
    });
    grunt.registerTask('default', ['setValuesTask', 'jshint','uglify']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};