angular.module('app.controllers', ['ngCordova'])

.controller('latestICDLNewsCtrl', function($scope, $http, $cordovaSQLite, $rootScope, $sce) {

	// pagination code
	var DEFAULT_PAGE_SIZE_STEP = 3;

	$scope.currentPage = 1;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;

    $scope.loadNextPage = function(){
	    $scope.currentPage++;
	    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
    }
    // end of pagination code

	/*********** DEFAULT ARTICLE**************/
	$scope.articles = [
		
		{
			title: "Computer Society of Zimbabwe wins ICDL Best Practice Award",
			img: "img/best-practice.jpg",
			date: "2016-06-13",
			body: "As an excellent example of best practice in using ICDL in education, the Computer Society of Zimbabwe won first place in this category with a project to pilot the new ICDL ICT in Education module. In second place, ECDL Romania were acknowledged for their initiative to teach high-school students how to use 3D printing technology. In Zimbabwe, the new ICDL ICT in Education module was piloted in teacher training colleges, including Seke Teachers’ College. The college, which is a Government National Primary Training College, located about 26 kilometres south-east of Harare, ran the pilot project between January and March 2016, with very positive results. A trainer at the college praised the module, saying, “The module is exactly what we need. It will improve the skills of our learners.” Teacher training colleges in Zimbabwe are now keen to take up the module, with one college deciding that 600 final year students should take the module, with wider adoption as the module becomes fully available."
		},
	];
	/*****************************************/

	$http.get('http://www.csz.org.zw/icdlapp/wp-json/wp/v2/posts').then(function(response){
	    //the response from the server is now contained in 'response

	    for (i = 0; i < response.data.length; i++) {

	    	try {
		      var title = response.data[i].title.rendered;
		      var img = response.data[i].better_featured_image.media_details.sizes.medium.source_url;
		      var date = response.data[i].date;
		      var body = response.data[i].content.rendered;

		      body = $sce.trustAsHtml(body);
		      
		      var obj = {
		        title: title,
		        img: img,
		        date: date,
		        body: body
		      }

		      $scope.articles.push(obj);

	    	} catch(error) {
	    		console.log("Error with recieved JSON: " + error);
	    	}

	    }
	  }, function(error){
	      console.log("The following error occured: " + error);
	  });

	$scope.insert = function(title, img, date, body) {
		var query = "INSERT INTO articles (title, img, date, body) VALUES (?, ?, ?, ?)";

		$cordovaSQLite.execute($rootScope.db, query, [title, img, date, body]).then(function(result) {
			console.log("Insert Title -> " + result.title);
		}, function(error) {
			console.log("Error occured: " + error);
		});
	}

	$scope.select = function() {
		var query = "SELECT title, img, date, body FROM articles";

		$cordovaSQLite.execute($rootScope.db, query).then(function(result) {
			if (result.rows.length > 0) {
				//console.log("SELECTED -> " + result.rows.item(4).title);

				counter = 0;

				for (i = 0; i < result.rows.length; i++) {
					counter++;
					console.log("Record #" + counter + ": " + "\n" +
						"Title: " + result.rows.item(i).title + "\n" +
						"img: " + result.rows.item(i).img + "\n" +
						"date: " + result.rows.item(i).date + "\n" +
						"body: " + result.rows.item(i).body + "\n\n");
				}
			}
		}, function(error) {
			console.log(error);
		});
	}

})

.controller('iCDLModulesCtrl', function($scope) {

})

.controller('trainingExamsCtrl', function($scope) {

	$scope.steps = [];
	$scope.steps[0] = {
		number: "Step One",
		title: "Find a nearby accredited test center",
		body: "For information on modules available, training, testing, and pricing please contact your local ICDL Accredited Test Centre."
	}

	$scope.steps[1] = {
		number: "Step Two",
		title: "Register & create your ICDL Profile",
		body: "Purchase your unique candidate registration number. You can use this number to continue your ICDL education anywhere in the world. Choose from our list of modules or certifiy your skills with one of our recommended profiles: Base, Standard or Expert."
	}

	$scope.steps[2] = {
		number: "Step Three",
		title: "Undertake training",
		body: "There are a range of training options available through your local ICDL Accredited Test Centre."
	}

	$scope.steps[3] = {
		number: "Step Four",
		title: "Get ICDL certified",
		body: "Take the certification tests at an ICDL Accredited Test Centre. You decide which modules will appear on your ICDL certificate."
	}

	$scope.steps[4] = {
		number: "Step Five",
		title: "Refresh",
		body: "Have you recently received a promotion or undertaken a career change? Keep up to date with technology by adding more modules to your ICDL Profile."
	}

	/*
	   * if given step is the selected step, deselect it
	   * else, select the given step
	*/
	$scope.toggleStep = function(step) {
		if ($scope.isStepShown(step)) {
		  $scope.shownStep = null;
		} else {
		  $scope.shownStep = step;
		}
	};
	$scope.isStepShown = function(step) {
		return $scope.shownStep === step;
	};

})

.controller('accreditedICDLCentersCtrl', function($scope) {

})

.controller('becomeACenterCtrl', function($scope) {

})

.controller('fAQSCtrl', function($scope) {

	  $scope.faqs = [];
	  $scope.faqs[0] = {
	    question: "What is the International Computer Driving Licence (ICDL)?",
	    answer: "ICDL is an internationally recognised qualification that enables people to certify their computer skills to an internationally recognised standard."
	  }

	  $scope.faqs[1] = {
	    question: "What is the European Computer Driving Licence (ECDL)?",
	    answer: "ECDL is the name given to the ICDL Programme in Europe."
	  }

	  $scope.faqs[2] = {
	    question: "Where can I complete my ICDL training and testing?",
	    answer: "At any ICDL Accredited Test Centre. While most ICDL Accredited Test Centres provide both training and testing, some provide testing only. Please check with the Computer Society of Zimbabwe if the centre does not have a current ICDL accreditation certificate displayed."
	  }

	  $scope.faqs[3] = {
	    question: "When can I start ICDL?",
	    answer: "You can start ICDL at any time by contacting any of the ICDL Accredited Test Centres near you. You are encouraged to undertake training at an ICDL Centre if required. Once you are ready, you may take a test for any of the modules in any order you choose. This may be subject to training or testing schedules set by each test centre."
	  }

	  $scope.faqs[4] = {
	    question: "How are candidates tested?",
	    answer: "Candidates are tested in examination conditions Supervised by an ICDL Accredited Tester. Test centres use manual or automated test systems which assess the candidate’s performance."
	  }

	  $scope.faqs[5] = {
	    question: "What is ICDL Profile?",
	    answer: "ICDL Profile is a statistical presentation of a student’s progress as they go through their examinations recorded on a Profile Card."
	  }

	  $scope.faqs[6] = {
	    question: "What are Recommended Profiles?",
	    answer: "We recommend certain combinations of modules as globally applicable standards in digital proficiency. These are the ICDL Base, Standard ICDL and ICDL Advanced recommended profiles."
	  }

	  $scope.faqs[7] = {
	    question: "What Certificates are candidates entitled to?",
	    answer: "After passing the modules under the ICDL Base or Standard ICDL profiles, the candidates will be entitled to a Base Certificate or Standard Certificate respectively. Any other combination will be profile certificate."
	  }

	  $scope.faqs[8] = {
	    question: "How much training is required?",
	    answer: "Usually people take training on each module prior to taking the test, although training is not compulsory. Some candidates may feel competent enough in one area to forego training and move directly to testing, whereas others may require full training before testing. The amount of training needed will depend on the candidate's existing skills levels prior to commencing training and the type of training - for example, instructor-led or e-learning. Typically the average training time for those without prior experience is approximately 12-16 hours per module. Accredited Test Centres may also have policies about training with them before allowing you to test."
	  }

	  $scope.faqs[9] = {
	    question: "How long are the tests?",
	    answer: "Each module is tested separately with each test being 45 minutes. The advanced tests are 1 hour. The tests can be attempted in any order."
	  }

	  /*
	   * if given faq is the selected faq, deselect it
	   * else, select the given faq
	   */
	  $scope.toggleFaq = function(faq) {
	    if ($scope.isFaqShown(faq)) {
	      $scope.shownFaq = null;
	    } else {
	      $scope.shownFaq = faq;
	    }
	  };
	  $scope.isFaqShown = function(faq) {
	    return $scope.shownFaq === faq;
	  };

// code for the ion-bar color
	  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.viewColor = 'green';
});
//////////////////////////////////////////////////////

})

.controller('creditsCtrl', function($scope) {

})

.controller('introductoryModulesCtrl', function($scope) {

	$scope.modules = [];

	$scope.modules[0] = {

	    title: "Digital Citizen",
	    img: "img/dc-1.png",
	    body: "Digital Citizen is specially developed to cater for those with no experience whatsoever of computers and the Internet. Digital Citizen helps to remove the fear of using a computer for complete novices by using a simple, non-threatening approach to educating individuals in the basic skills of using a computer, email and the Internet.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBQ0ZKUG1NYXBLRFU",
	}

	$scope.modules[1] = {

	    title: "Digital Citizen Plus",
	    img: "img/dc-2.png",
	    body: "Digital Citizen Plus is specially developed as an introduction to the ICDL Base Modules, to cater for candidates who have very little experience of computers and the Internet. Digital Citizen Plus helps to remove the fear of using a computer for beginners by using a simple, non-threatening approach to educating individuals in the basic skills of using a computer, email and the Internet.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBbEZraVhoVkh0XzA",
	}

	$scope.open = function (url) {
		$window.open(url, '_system');
	}

})

.controller('baseModulesCtrl', function($scope) {

	$scope.modules = [];

	$scope.modules[0] = {

	    title: "Computer Essentials",
	    img: "img/pc.jpg",
	    body: "This module will teach you the essential concepts and skills relating to the use of devices, file creation and management, networks and data security.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBOEhyV2ZseVVhTms",
	}

	$scope.modules[1] = {

	    title: "Online Essentials",
	    img: "img/online-essentials.jpg",
	    body: "This module will teach you the essential concepts and skills relating to web browsing, effective information search, online communication and e-mail.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBUmJRVll2bHUtNms",
	}

	$scope.modules[2] = {

	    title: "Word Processing",
	    img: "img/word-processing.jpg",
	    body: "This module teaches you to use a word processing application to accomplish everyday tasks associated with creating, formatting and finishing small-sized word processing documents, such as letters and other everyday documents.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBQzNvd25vWHFPOUk",
	}

	$scope.modules[3] = {

	    title: "Spreadsheets",
	    img: "img/spreadsheets.jpg",
	    body: "This module teaches you to understand the concept of spreadsheets and to use a spreadsheet application. It will enable you to perform tasks associated with developing, formatting, modifying and using a spreadsheet, to use standard formulas and functions, and to competently create and format graphs or charts.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBYjRVUzdUOV8yRUE",
	}

	$scope.open_link = function(url) {
		window.open(url, '_system', 'location=yes');
		return false;
	}

})

.controller('standardModulesCtrl', function($scope) {
	$scope.modules = [];

	$scope.modules[0] = {

	    title: "Presentation",
	    img: "img/presentation.jpg",
	    body: "This module will enable you to demonstrate competence in using presentation tools on a computer. It will teach you to perform tasks such as creating, formatting, modifying and preparing presentations using different slide layouts for display and printed distribution.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBZGJya3Bac2JlekE",
	}

	$scope.modules[1] = {

	    title: "Using Databases",
	    img: "img/using-databases.jpg",
	    body: "This module develops work-based skills. It will enable you to understand the main concepts of databases and demonstrate the ability to use a database application. This includes creating and modifying tables, queries, forms and reports, and preparing outputs ready for distribution, as well as learning to relate tables and to retrieve and manipulate information from a database by using query and sort tools.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBd2pramhzUHdGZ2s",
	}

	$scope.modules[2] = {

	    title: "Online Collaboration",
	    img: "img/online-collaboration.jpg",
	    body: "This module teaches you how to effectively collaborate on online/remote project, either for work or study. It sets out concepts and skills relating to the setup and use of online collaborative tools, such as storage, productivity applications, calendars, social media, web meetings, learning environments, and mobile technology.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBVGo2TU56NlZOTk0",
	}

	$scope.modules[3] = {

	    title: "IT Security",
	    img: "img/it-security.jpg",
	    body: "This IT Security module has been developed to enable you, the computer user (rather than IT professionals), to identify and protect yourself and their organisation from common security challenges when using ICT. It will also teach you how to operate safely when online.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBdlVrUi1FNERxUlU",
	}

	$scope.modules[4] = {

	    title: "Project Planning",
	    img: "img/project-planning.jpg",
	    body: "Project Planning has been developed to enable you, the computer user (rather than IT professionals) to use project management software to prepare project plans and monitor projects including planning and managing time, costs, tasks, and resources. These skills can be applied to both work and home-based projects.",
	    syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBT3lCNERqWndrMkk",
	}

	$scope.open_link = function(url) {
		window.open(url, '_system', 'location=yes');
		return false;
	}

})

.controller('advancedModulesCtrl', function($scope) {
  $scope.modules = [];

  $scope.modules[0] = {

      title: "Advanced Word Processing",
      img: "img/adv-word-processing.jpg",
      body: "This module will provide you with the ability to use the advanced features of word processing applications to enhance your work, improve productivity and save time. By successfully completing this module you will acquire a skill set over and above the routine features of the software.",
      syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBOE04OE1EVTJITFk",
  }

  $scope.modules[1] = {

      title: "Advanced Spreadsheets",
      img: "img/adv-spreadsheets.jpg",
      body: "Successful completion of this module will enable you to master the more advanced functions of spreadsheet applications, enabling you to produce more sophisticated  reports, and to perform complex mathematical and statistical calculations. These skills will save you considerable amounts of time and will improve your productivity.",
      syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBMW9GTjh6YTFUQ28",
  }

  $scope.modules[2] = {

      title: "Advanced Databases",
      img: "img/adv-db.jpg",
      body: "The skills gained through this module will enable you to maximise advanced database functions, in order to manage and analyse high volumes of data. This will enable you to efficiently produce the quantity and quality of information that business today demands.",
      syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBTHFOVWx4a0c4Y3M",
  }

  $scope.modules[3] = {

      title: "Advanced presentation",
      img: "img/adv-presentation.jpg",
      body: "This module covers advanced presentation features that will allow you to use the presentation application to its full potential, and to plan and design more effective presentations that have greater impact and that will better engage and involve an audience.",
      syllabus: "https://drive.google.com/open?id=0B6BWrcoBzomBc2pvUGh5SmlLZDQ",
  }

  $scope.open_link = function(url) {
		window.open(url, '_system', 'location=yes');
		return false;
  }

})
