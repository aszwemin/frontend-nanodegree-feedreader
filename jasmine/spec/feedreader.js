/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('urls are defined and not empty', function() {
			allFeeds.forEach(function(el) {
				expect(el.url).toBeDefined();
				expect(el.url).not.toBe('');
			});
		});


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it('name are defined and not empty', function() {
			allFeeds.forEach(function(el) {
				expect(el.name).toBeDefined();
				expect(el.name).not.toBe('');
			});
		});
    });


    /* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it('menu is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('menu visibility is toggled', function() {
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('feeds are loaded', function() {
			expect($('.feed .entry').length).not.toEqual(0);
		});
	});

    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var firstEntryInitial = $('.feed .entry')[0];

		beforeEach(function(done) {
			loadFeed(1, done);
		});

		it('content changes on loadFeed', function() {
			expect($('.feed .entry')[0]).not.toEqual(firstEntryInitial);
		});
	});

	/* Test feed entry details container. This container will hold
	 * the actual article, so the user doesn't have to be redirected
	 * to the new page
	 */
	describe('Feed Text Container', function() {
		/* Make sure that the container is not initially visible */
		it('feed container is not initially visible', function() {
			expect($('.feed-container').hasClass('hidden')).toBe(true);
		});

		/* After clicking on a feed entry, feed container is made
		 * visible and is populated with the text
		 */
		it('container is shown and populated after clicking entry', function() {
			$($('.feed .entry')[0]).trigger('click');
			expect($('.feed-container').hasClass('hidden')).toBe(false);
			expect($('.feed-container').text()).not.toBe(null);
			expect($('.feed-container').text()).not.toEqual('');
		});

		afterEach(function() {
			$('.feed-container').addClass('hidden');
			$('.feed-container').text('');
		});
	});
}());
