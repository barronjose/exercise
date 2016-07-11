(function(callback) {

    callback(window.jQuery, window, document);

    }(function($, window, document) {

        /**
         * @description On Document start
         */
        $(function() {
            setLoader();
            setListeners();
            getPosts();
        });

        /**
         * @description Set Loader for Ajax calls
         * @function setLoader
         */
        function setLoader() {
            var $loading = $('.loader').hide();
            $(document)
                .ajaxStart(function () {
                    $loading.show();
                })
                .ajaxStop(function () {
                    $loading.hide();
                });
        }

        /**
         * @description Set jQuery event listeners
         * @function setListeners
         */
        function setListeners() {
            var openModal = $('#openModel'),
                modalBox = $('.modal'),
                posts = $('#posts'),
                expandable = $('.expandable span'),
                collapsable = $('.collapsable');

            posts.change(changePost);

            openModal.click(function() {
                modalBox.fadeIn();
            });

            modalBox.find('.close').click(function onClick() {
                modalBox.fadeOut();
            });

            expandable.click(function onClick(e) {
                var target = $(this).parent();
                target.toggleClass('visible');
                target.find('.sub-menu').first().toggle();
                e.stopPropagation();
            });

            collapsable.find('span').click(function onClick() {
                $('#header').toggleClass('responsive');
            });
        }

        /**
         * @description Get Posts to populate select
         * @function getPosts
         */
        function getPosts() {
            PostService.getAll()
                .then(appendOptions)
                .fail(onError);
        }

        /**
         * @description Append options to selections
         * @function appendOptions
         * @param {Array} options
         */
        function appendOptions(options) {
            var result;

            options.forEach(function(option) {
                result += '<option value="' + option.id + '">' + option.title + '</option>';
            });

            $('#posts').append(result);
        }

        /**
         * @description Transform post info into post template
         * @function postTmpl
         * @param {Object} post
         * @return {String} template
         */
        function postTmpl(post) {
            return '<article class="post">' +
                        '<h2 class="title">'+ post.title +'<h2/>' +
                        '<p>Created by ' +
                            '<span class="author">' + post.author + ' </span>' +
                            'on <span class="date">  ' + post.date + '</span>' +
                        '</p>' +
                        '<div class="image"></div>' +
                        '<p>'+ post.body +'<p/>' +
                    '</article>';
        }

        /**
         * @description Append post to HTML
         * @function appendPost
         * @param {object} post
         */
        function appendPost(post) {
            var postModel = new PostModel(post);
            $('article').html(postTmpl(postModel));
        }

        /**
         * @description Clear HTML post div
         * @function clearPost
         */
        function clearPost() {
            $('article').html('');
        }

        /**
         * @description Change Post and get Post data
         * @function changePost
         */
        function changePost() {
            var id = $('#posts').val();

            if (isNaN(parseFloat(id))) {
                clearPost();
                return;
            }

            PostService.get(id)
                .then(appendPost)
                .fail(onError);
        }

        /**
         * @description Console log error messages on Ajax calls
         * @function onError
         */
        function onError(e) {
            console.log(e);
        }

        /**
         * @description Transfor post into a Post Model
         * @class PostModel
         * @param {Object} post
         * @return {Object} postModel
         */
        var PostModel = function PostModel(post) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            function getRandomImage() {
                return 'http://placehold.it/1000x500';
            }

            function getDate() {
                var fullDate = new Date(),
                    month = fullDate.getMonth();
                return months[month] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear() ;
            }

            function getRandomAuthor() {
                var text = '',
                    possible = 'abcdefghijklmnopqrstuvwxyz';

                for(var i=0; i < 10; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

            // Setters y Getters
            return {
                title: post.title || '',
                body: post.body || '',
                image: getRandomImage(),
                date: getDate(),
                author: getRandomAuthor()
            };
        };

        /**
         * @description Service Class for Posts
         * @class PostService
         * @param {Object} postService
         */
        var PostService = (function(){
            return {
                getAll : function getAll(){
                    return $.ajax({
                        method: 'GET',
                        url: 'http://jsonplaceholder.typicode.com/posts'
                    });
                },
                get : function get(id) {
                    return $.ajax({
                        method: 'GET',
                        url: 'http://jsonplaceholder.typicode.com/posts/' + id
                    });
                }
            };
        })();
    })
);
