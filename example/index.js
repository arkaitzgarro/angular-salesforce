angular.module('salesforceApp', ['ngSalesforce'])
  .config(function ($salesforceProvider) {
    $salesforceProvider
      .onlineButtonId('liveagent_button_online_uniqueId')
      .offlineButtonId('liveagent_button_offline_uniqueId')
      .chatUrl('https://d.la2w1cs.salesforceliveagent.com/chat')
      .deploymentId('deploymentId')
      .organisationId('organisationId')
  })
  .run(function ($salesforce) {
    $salesforce.init()
  })
  .controller('ctrl', ['$scope', '$salesforce', function ($scope, $salesforce) {
    $scope.buttonId = 'uniqueId'
    $scope.launchChat = function () {
      $salesforce.startChatWithWindow()
    }
  }])

angular.bootstrap(document, ['salesforceApp'])
