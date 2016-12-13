# angular-salesforce
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

An Angular.js wrapper for Salesforce providing a simple and familiar API for Angular Developer.

#How do I add this to my project?
You can download `angular-salesforce` by:

* (prefered) Using npm and running `npm install angular-salesforce --save`
* Downloading it manually by clicking here to download development [(unminified)](https://cdn.rawgit.com/arkaitzgarro/angular-salesforce/master/angular-salesforce.js) [(minified)](https://cdn.rawgit.com/arkaitzgarro/angular-salesforce/master/angular-salesforce.min.js)

# Example
Here is a simple which allows you to include your own `deploymentId` and `organisationId` to test. Below is a quick start guide. Use either `$salesforce` or `Salesforce` service depending on your preference and opinions.

````html
<!-- I'm using angular 1.5.9+ but any version should work -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.9/angular.js"></script>

<!-- include this module after angular.js -->
<script src="node_modules/angular-salesforce/angular-salesforce.js"></script>

<script>
  angular.module('salesforceApp', [
    'ngSalesforce'
  ])

  // Configure your $salesforce module
  .config(function($salesforceProvider) {
    $salesforceProvider
      .onlineButtonId('liveagent_button_online_uniqueId')
      .offlineButtonId('liveagent_button_offline_uniqueId')
      .chatUrl('https://d.la2w1cs.salesforceliveagent.com/chat')
      .deploymentId('deploymentId')
      .organisationId('organisationId')
  })
  // init $salesforce
  .run(function ($salesforce) {
    $salesforce.init()
  })
  .controller('MainCtrl', function($scope, $salesforce) {
    $scope.launchChat = function () {
      $salesforce.startChatWithWindow()
    }
  });
</script>

<body>
  <div ng-controller="MainCtrl">
    <button
      type="button"
      id="liveagent_button_online_uniqueId"
      style="display:none;"
      ng-click="launchChat()">Start chat</button>
    <div id="liveagent_button_offline_uniqueId" style="display:none;">Service not available</span>
    </div>
  </div>
</body>
````

# License
[MIT](https://github.com/arkaitzgarro/angular-salesforce/blob/master/LICENSE)
