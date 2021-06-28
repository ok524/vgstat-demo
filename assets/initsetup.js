$(function(){
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
        }
    });
});

(function($){
    var $_ajax = $.ajax;
    $.ajax = function(options){
        options.checkCsrfToken = function(resData){
//            if(resData['newCsrfToken']){
//                $('meta[name="csrf-token"]').attr('content', resData.newCsrfToken);
//                if(options.reProcess)
//                    options.reProcess();
//                return false;
//            }
            if(resData['sessionExpired']){
                location.reload();
                return false;
            }
            return true;
        };
        
        var _success;
        if(options.success)
            _success = options.success;
        
        options.success = function(data){
            if(!options.checkCsrfToken(data))
                return;
            _success(data);
        }
        
        var _error;
        if(options.error)
            _error = options.error;
        options.error = function(httpObj, textStatus){
            if(httpObj.status===401){
                location.href = '/account/login?returnTo='+encodeURIComponent(location.href);
                return;
            }
            if(_error)
                _error(httpObj, textStatus);
        }
        
        $_ajax.apply($, arguments);
    };
})(jQuery);
