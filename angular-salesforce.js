(function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['angular'], function (angular) {
      return factory(root, angular, root.liveagent)
    })
  } else if (angular) { // Angular
    factory(root, root.angular, root.liveagent)
  }
}(this, function (global, angular, liveagent) {
  'use strict'

  if (liveagent && global && !global.liveagent) {
    global.liveagent = liveagent
  }

  // Create a script tag with url as the source
  // and call callback when it has been loaded
  function loadScript (url, callback) {
    if (!document) { return }
    var script = document.createElement('script')
    if (script.addEventListener) {
      script.addEventListener('load', function (event) { callback(null, event) }, false)
    } else {
      script.attachEvent('load', function (event) { callback(null, event) }, false)
    }
    script.type = 'text/javascript'
    script.async = true
    script.src = url
    // Attach the script tag to the document head
    var s = document.getElementsByTagName('head')[0]
    s.appendChild(script)
  }

  var scriptConfig = {
    asyncLoading: true,
    scriptUrl: 'https://c.la1-c2-lon.salesforceliveagent.com/content/g/js/38.0/deployment.js'
  }

  var settings = {
    onlineButtonId: '',
    offlineButtonId: '',
    chatUrl: '',
    deploymentId: '',
    organisationId: ''
  }

  function $SalesforceProvider () {
    var provider = this

    angular.forEach(settings, function (val, key) {
      provider[key] = function (newValue) {
        settings[key] = newValue || val
        return provider
      }
    })

    provider.$get = ['$log', '$q', '$rootScope', function ($log, $q, $rootScope) {
      var scriptLoaded = $q.defer()

      function $salesforce () {
        global.liveagent.apply(global.liveagent, arguments)
        return $salesforce
      }

      function buildMethod (func, method) {
        $salesforce[method] = func
        $salesforce['$' + method] = function () {
          func.apply(liveagent, arguments)
          if (!$rootScope.$$phase) { $rootScope.$apply() }
          return $salesforce
        }
      }

      function checkSettings () {
        angular.forEach(settings, function (val, key) {
          if (angular.isUndefined(val) || val.length === 0) {
            $log.warn('[ngSalesforce] ' + key + ' is not defined')
          }
        })
      }

      if (!global.liveagent) {
        loadScript(scriptConfig.scriptUrl, function () { scriptLoaded.resolve })
      }

      var methods = {
        init: function () {
          checkSettings()
          scriptLoaded.promise.then(function () {
            global._laq = global._laq || []
            global.liveagent.init(settings.chatUrl, settings.deploymentId, settings.organisationId)
            global._laq.push(function () {
              global.liveagent.showWhenOnline(settings.buttonId, document.getElementById(settings.onlineButtonId))
              global.liveagent.showWhenOffline(settings.buttonId, document.getElementById(settings.offlineButtonId))
            })
          })
        },
        startChatWithWindow: function (buttonId) {
          scriptLoaded.promise.then(function () {
            global.liveagent.startChatWithWindow(settings.buttonId, settings.buttonId)
          })
        }
      }

      angular.forEach(methods, buildMethod)

      return $salesforce
    }]
  }

  angular.module('ngSalesforce', [])
    .provider('$salesforce', $SalesforceProvider)
    .provider('Salesforce', $SalesforceProvider)

  angular.module('angular-salesforce', ['ngSalesforce'])

  return angular.module('ngSalesforce')
}))
