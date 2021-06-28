(function($)  
{
    $.fn.initSearchBar = function(options)
    {
        // default parameters 
        var defaults =  
        {  
            // search collection
            component : '',
			componentPlaceholder:'',
			searchEngineServer:'',
			paramName:'q',
			componentActionUrl:'',
			spotlightUrl:'',
			componentIcon:'',
			spotlightIcon:'icon-logo-logomark_KEEP',
			searchBtnColor:'',
			containerHoverOpacity:'1',
			CIBackgroundColor:'',
			SIBackgroundColor:'',
			onlySpotlight:false
        }
        // set parameters
        var options = $.extend(defaults, options);
		
		var globalArgs = 
		{
			defaultValue:1,
			dropdownValue:2,
			defaultPlaceHolder : 'Search KEEP'
		}
		
        var $this = $(this);  var $parent = $this.parent();
				
        // hide orignal box
        $this.attr({style : 'display: none;'});
        // insert search box
		insertSearchBar($parent);

        if(!isEmpty(options.component) && !isEmpty(options.searchEngineServer) && !isEmpty(options.spotlightUrl))
        {  
			$('#search-button-icon').attr('style','color:'+options.searchBtnColor);
			
			$("#dropbtn").attr('class',options.componentIcon);
			$("#dropbtn-1").attr('class',options.spotlightIcon);
			$(".top-dropbox").css('background',options.CIBackgroundColor);
			$(".top-drop-icon").css('background',options.CIBackgroundColor);
			
			$(".top-dropbox-1").css('background',options.SIBackgroundColor);
			
			$('.top-search-box').attr("action",options.componentActionUrl);
			$("#postTo").html(globalArgs.defaultValue);
			$('#top-search-box').attr("name",options.paramName);
			$('#top-search-box').attr("placeholder",options.componentPlaceholder);
			setAutocomplete(castServiceUrl(options.searchEngineServer,'collection2','suggestJsonp'));
			
			if(options.onlySpotlight == true){
				$('.top-drop-icon div').attr('class','');
				$('.top-drop-icon div').html('&nbsp;');
				$('.top-dropbox').css('cursor','default');
				$('.top-drop-icon div').css('cursor','default');

				$("#dropbtn").attr('class',options.spotlightIcon);
				$(".top-dropbox").css('background',options.SIBackgroundColor);
				$(".top-drop-icon").css('background',options.SIBackgroundColor);
			
				$('.top-search-box').attr("action",options.spotlightUrl);
				$('#top-search-box').attr("placeholder",globalArgs.defaultPlaceHolder);
				$('.top-search-box-left').css('left','19%');
				$('.top-search-box-clear').css('left','93%')
				setAutocomplete(castServiceUrl(options.searchEngineServer,'collection2','suggestJsonp'));
			}
			
        }else{
        	alert('Don\'t have enough parameters')
        }

		eventHandler(globalArgs,options);
    };
	
	var eventHandler = function(globalArgs,options){
		$(document).click(function (e) {
		    // checkHidden(e,options);
		});
		
		
		$('#search-button-icon').click(function(event)
        {
			$('#searchBarTool').attr('class','animation active');
			$('#top-search-box').focus();
			// $('#search-button-icon').hide();
			$('#search-button-icon').attr('class','glyphicon glyphicon-search active');
			$(".serach-container").css("opacity","1");
			$(".serach-container").hover(function(){
			  // $(".serach-container").css("background-color","");
			  $(".serach-container").css("opacity","1");
			  },function(){
				  $(".serach-container").css("opacity","1");
			});
        });
		
		$('.top-dropbox').click(function(event)
        {
			if(options.onlySpotlight == false){
				if($('.top-dropbox-1').css('display') == 'none'){
					$('.top-dropbox-1').show();
				}else{
					$('.top-dropbox-1').hide();
				}
			}
        });
		
		$('.top-drop-icon').click(function(event)
        {
			if(options.onlySpotlight == false){
				if($('.top-dropbox-1').css('display') == 'none'){
					$('.top-dropbox-1').show();
				}else{
					$('.top-dropbox-1').hide();
				}
			}
        });
		
		$('.top-dropbox-1').click(function(event)  
        {
			dropClick(globalArgs,options);
        });
		
		$('.top-search-box-clear').click(function(event)  
        {
			$('#top-search-box').val('');
			$('.top-search-box-clear').hide();
        });
		
		$('#top-search-box').keyup(function(event)  
        {
			if($('#top-search-box').val() != ''){
				$('.top-search-box-clear').show();
			}else{
				$('.top-search-box-clear').hide();
			}
        });
	}
	
	var checkHidden = function(e,options){
	    var drop = $(".top-dropbox"),
	        dropel = drop[0],
	        target = e.target;
		var dropIcon = $('.top-drop-icon'),
			dropelIcon = dropIcon[0];
	    if (dropel !== target && !$.contains(dropel, target) && dropelIcon !== target && !$.contains(dropelIcon, target)) {
	        $('.top-dropbox-1').hide();
	    }
		
		var searchBtn = $('#search-button-icon'),
			searchIcon = searchBtn[0];
		
		var autocomplete = $('.autocomplete-suggestions');
		// console.log(e);
		if(target.className == 'autocomplete-suggestion autocomplete-selected'){
			return;
		}
		
		if($('#searchBarTool').attr('class') == 'animation active' && searchIcon !== target){
			var searchBar = $("#searchBarTool"),
				searchBarBox = searchBar[0];
		    if (searchBar !== target && !$.contains(searchBarBox, target)) {
				$('#searchBarTool').attr('class','animation');
				// $('#search-button-icon').show();
				$('#search-button-icon').attr('class','glyphicon glyphicon-search');
				$('#top-search-box').val('');
				$('.top-search-box-clear').hide();
				$(".serach-container").hover(function(){
				  // $(".serach-container").css("background-color","");
				  $(".serach-container").css("opacity",options.containerHoverOpacity);
				  },function(){
					  $(".serach-container").css("opacity","1");
				});
		    }
		}
	}
	
	var dropClick = function(globalArgs,options){
		if($("#postTo").html() == globalArgs.defaultValue){
			
			$("#dropbtn").attr('class',options.spotlightIcon);
			$("#dropbtn-1").attr('class',options.componentIcon);
			
			$('#top-search-box').attr("placeholder",globalArgs.defaultPlaceHolder);
			
			$(".top-dropbox").css('background',options.SIBackgroundColor);
			$(".top-drop-icon").css('background',options.SIBackgroundColor);
			$(".top-dropbox-1").css('background',options.CIBackgroundColor);
			
			$('.top-search-box').attr("action",options.spotlightUrl);
			$('#top-search-box').attr("name",'q');
			$("#postTo").html(globalArgs.dropdownValue);
			setAutocomplete(castServiceUrl(options.searchEngineServer,'collection2','suggestJsonp'));
		}else{
			$("#dropbtn-1").attr('class',options.spotlightIcon);
			$("#dropbtn").attr('class',options.componentIcon);
			
			$('#top-search-box').attr("placeholder",options.componentPlaceholder);
			
			$(".top-dropbox").css('background',options.CIBackgroundColor);
			$(".top-drop-icon").css('background',options.CIBackgroundColor);
			$(".top-dropbox-1").css('background',options.SIBackgroundColor);
			
			$('.top-search-box').attr("action",options.componentActionUrl);
			$('#top-search-box').attr("name",options.paramName);
			$("#postTo").html(globalArgs.defaultValue);
			setAutocomplete(castServiceUrl(options.searchEngineServer,'collection2','suggestJsonp'));
		}
		return;
	}
	
	var insertSearchBar = function($element){
        // search box html code
        var html = '';  
		html += '<div id="searchBarKit">'
		html += '<div id="search-button-icon" class="glyphicon glyphicon-search"></div>'
        html += '<div id="searchBarTool" class="animation" style="display: block;"><form accept-charset="UTF-8" action="" class="top-search-box" onsubmit="return validateMyForm();" method="get">';
        html += '<div style="display:none">';
        html += '<input name="utf8" type="hidden" value="&#x2713;" />';
		html += '<span id="postTo"></span></div>';
		
		html += '<div class="top-dropbox">';
		html += '<span id="dropbtn" class=""></span></div>';
        html += '<div class="top-drop-icon">';  
        html += '<div class="glyphicon glyphicon-chevron-down"></div> </div>';  
		
        html += '<div class="top-search-box-left">';  
        html += '<input id="top-search-box" type="text" name="" value="" placeholder=""></div>';  
        html += '<div class="top-search-box-clear" style="display: none;">';  
        html += '<span class="glyphicon glyphicon-remove"></span> </div>';  
        html += '</form>';
		html += '<div class="top-dropbox-1" style="display: none;">';
		html += '<span id="dropbtn-1" class=""></span></div></div>';
		html += '</div>'
          
        // insert search box
        $element.append(html);
	};
      
  
    var isEmpty = function(obj)  
    {
        if(null == obj)  
        {  
            return true;  
        }  
        else if(undefined == obj)  
        {
            return true;  
        }
        else if("" == obj)  
        {
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    };
	
	var castServiceUrl = function(baseUrl,collection,action){
		return baseUrl+action;
	}
	
	var setAutocomplete = function(url){
		$('#top-search-box').autocomplete({
		    serviceUrl: url,
			paramName:'query',
			dataType: "jsonp",
			triggerSelectOnValidInput:false,
		    params:{
		    	wt:'json'
		    },
			ajaxSettings: {jsonp: 'callback'},
			transformResult: function(response) {
				var result = response;
				if(isEmpty(result)){
					return {suggestions:''}
				}
				return {suggestions: response};
			}
		});
	};
	
	
	
})(jQuery);

function validateMyForm()
{
	if($('#top-search-box').val() == ''){
		return false;
	}
	return true;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie( name, path, domain ) {
  if( getCookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function logout() {
  deleteCookie(VG_USER_COOKIE_1, '/', 'veriguide.org'); // delete vg user header cookie
  deleteCookie(VG_SP_SAML_COOKIE, '/', 'veriguide.org'); //delete vg sp cookie just in case
  var redirectTo = VG_LOGIN_URL;
  window.location.href = VG_LOGOUT_REDIRECT + redirectTo;
}

(function() {
  var root, source;
  source = '<style>'+
  '    .nav-logo .menu-item,'+
  '    .nav-logo .menu-item:visited {'+
  '        color: {'+
  '                {'+
  '                color'+
  '            }'+
  '        }'+
  ''+
  '        ;'+
  '    }'+
  ''+
  '    @media screen and (min-width: 801px) {'+
  ''+
  '        .keepmenu a:hover,'+
  '        .menu:hover .menu-item {'+
  '            color: {'+
  '                    {'+
  '                    color'+
  '                }'+
  '            }'+
  ''+
  '            ;'+
  '        }'+
  '    }'+
  '</style>'+
  '<style>'+
  '    .github-fork-ribbon {'+
  '        display: none;'+
  '        background-color: #f80;'+
  '    }'+
  '</style>'+
  '<div class=\"github-fork-ribbon-wrapper right\">'+
  '    <div class=\"github-fork-ribbon\"> <a href=\"#\">Staging</a> </div>'+
  '</div>'+
  '<nav class=\"keepmenu\">'+
  '    <div class=\"container\">'+
  '        <div class=\"nav-logo\">'+
  '            <div class=\"menu\"> <a class=\"menu-item\" href=\"{{appUrl}}\" onclick=\"return false\"><img'+
  '                        src=\"https://veriguide1.cse.cuhk.edu.hk/portal/plagiarism_detection/images/logo.png\"'+
  '                        width=\"200\" /></a>'+
  '                <div class=\"submenu\"> {{#appList}} {{#if url}} <a class=\"submenu-item\" href=\"{{url}}\"><i'+
  '                            class=\"keeplogo-logo_{{name}}_horizontal\"></i><img'+
  '                            src=\"https://veriguide1.cse.cuhk.edu.hk/portal/plagiarism_detection/images/logo.png\" /></a>'+
  '                    {{else}} <span class=\"submenu-item\"><i class=\"keeplogo-logo_{{name}}_horizontal\"></i></span>'+
  '                    {{/if}} {{/appList}} <div style=\"height: 0.8rem\"></div> <!-- <div class=\"follow-keep\"> -->'+
  '                    <!--   <div>Follow KEEP:</div> -->'+
  '                    <!--   <a target=\"_blank\" href=\"https://www.facebook.com/keepeduhk\"><i class=\"fa fa-facebook-square\"></i></a> -->'+
  '                    <!--   <a target=\"_blank\" href=\"https://plus.google.com/u/0/b/118326686239541805967/118326686239541805967/about\"><i class=\"fa fa-google-plus-square\"></i></a> -->'+
  '                    <!--   <a target=\"_blank\" href=\"https://www.linkedin.com/company/keep-knowledge-exchange-and-education-platform-?trk=top_nav_home\"><i class=\"fa fa-linkedin-square\"></i></a> -->'+
  '                    <!--   <a target=\"_blank\" href=\"https://twitter.com/KEEP_HK\"><i class=\"fa fa-twitter-square\"></i></a> -->'+
  '                    <!-- </div> -->'+
  '                </div>'+
  '            </div>'+
  '            <div class=\"hamburger\"> <i class=\"fa fa-bars\"></i> </div>'+
  '        </div>'+
  '        <div class=\"nav-left\"> {{#menu}} <div class=\"menu\"> <a class=\"menu-item\" href=\"{{url}}\">{{title}}</a>'+
  '                {{#if submenu}} <div class=\"submenu\"> {{#submenu}} <a class=\"submenu-item\"'+
  '                        href=\"{{url}}\">{{title}}</a> {{/submenu}} </div> {{/if}} </div> {{/menu}} </div>'+
  '        <div class=\"nav-right\"> {{#if isLogined}} <div class=\"menu\"> <a class=\"menu-item\" href=\"#\">{{hi}},&nbsp;'+
  '                    {{username}}</a> </div>'+
  '            <div class=\"menu\"> ' + 
  '               <a class=\"menu-item\" href=\"javascript:logout()\">{{logout}}&nbsp;<i class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></a> ' +
  '            </div> ' +  
  '        {{else}} ' +  
  '            <div class=\"menu\"> ' + 
  '              <a class=\"menu-item\" href=\"{{loginUrl}}\">{{signin}}</a> ' + 
  '            </div> {{/if}} ' + 
  '           <!-- <div class=\"menu\"> <a class=\"menu-item\" href=\"#\">{{share}}</a>'+
  '                <div class=\"submenu\">'+
  '                    <div class=\"follow-keep\"> ' + 
  '                       <a href=\"http://www.facebook.com/share.php?u=\"><i class=\"fa fa-facebook-square\"></i></a> ' + 
  '                       <a href=\"https://plus.google.com/share?url=\"><i class=\"fa fa-google-plus-square\"></i></a> ' +  
  '                       <a href=\"http://www.linkedin.com/shareArticle?mini=true&url=\"> <i class=\"fa fa-linkedin-square\"></i></a> ' + 
  '                       <a href=\"http://twitter.com/home?status=\"> <i class=\"fa fa-twitter-square\"></i></a> '+ 
  '                   </div>'+
  '                </div>'+
  '            </div> -->'+
  '            <!-- <div class=\"nav-search\">'+
  '                <div id=\"nav-searchbox\"></div>'+
  '            </div> -->'+
  '        </div>'+
  '    </div>'+
  '</nav>';
  

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.keepmenu = function(appName, menu, username, loginUrl, logoutUrl, searchUrl, queryParamName, suggestionCollection, lang) {
    var Hi, Share, appInfo, appList, context, html, keep, keepcatalog, keepcourse, keepedia, keepoll, keepository, keepsearch, signIn, signOut, template;
    if (searchUrl == null) {
      searchUrl = null;
    }
    if (queryParamName == null) {
      queryParamName = 'q';
    }
    if (suggestionCollection == null) {
      suggestionCollection = 'collection2';
    }
    if (lang == null) {
      lang = 'en';
    }
    keep = {
      name: 'KEEP',
      url: 'https://veriguide1.cse.cuhk.edu.hk/portal/plagiarism_detection/login.jsp',
      color: '#25B6CE'
    };
    keepcatalog = {
      name: 'KEEPCatalog',
      url: 'http://catalog.keep.edu.hk',
      color: '#9D3E9D'
    };
    keepcourse = {
      name: 'KEEPCourse',
      url: 'http://course.keep.edu.hk',
      color: '#6EAFDD'
    };
    keepsearch = {
      name: 'KEEPSearch',
      url: 'http://search.keep.edu.hk',
      color: '#F5C12C'
    };
    keepedia = {
      name: 'KEEPedia',
      url: 'http://pedia.keep.edu.hk',
      color: '#3ABDA4'
    };
    keepoll = {
      name: 'KEEPoll',
      url: 'http://poll.keep.edu.hk/',
      color: '#3ABDA4'
    };
    keepository = {
      name: 'KEEPository',
      color: '#F5C12C'
    };
    appList = [keep, keepcatalog, keepcourse, keepsearch, keepoll];
    appInfo = {
      KEEP: keep,
      KEEPCatalog: keepcatalog,
      KEEPCourse: keepcourse,
      KEEPSearch: keepsearch,
      KEEPedia: keepedia,
      KEEPoll: keepoll,
      KEEPository: keepository
    };
    signIn = {
      en: 'Sign In',
      hk: '登入',
      cn: '登录'
    };
    signOut = {
      en: 'Sign Out',
      hk: '登出',
      cn: '退出'
    };
    Hi = {
      en: 'Hi',
      hk: '您好',
      cn: '你好'
    };
    Share = {
      en: 'Share',
      hk: '分享',
      cn: '分享'
    };

    var vgUserLoginCookie = getCookie("vg3593a333b5523");
    var vgLoggedInUser = null;
    if ( vgUserLoginCookie !== undefined && vgUserLoginCookie.length > 0 ) {
      vgLoggedInUser = JSON.parse( vgUserLoginCookie ); 
      username = vgLoggedInUser.name;
    }
    
    context = {
      appName: appName,
      appUrl: appInfo[appName].url,
      appList: appList,
      menu: menu,
      color: appInfo[appName].color,
      isLogined: username !== '',
      username: username,
      loginUrl: loginUrl,
      logoutUrl: '',
      searchUrl: searchUrl,
      signin: signIn[lang],
      signout: signOut[lang],
      hi: Hi[lang],
      share: Share[lang],
      logout: "Logout"
    };
    template = Handlebars.compile(source);
    html = template(context);
    $('#keepmenu').after(html);
    $('#nav-searchbox').initSearchBar({
      component: suggestionCollection,
      componentPlaceholder: "Search " + appName,
      searchEngineServer: 'https://search.keep.edu.hk/',
      paramName: queryParamName,
      componentActionUrl: searchUrl === null ? '/' : searchUrl,
      spotlightUrl: 'https://search.keep.edu.hk/spotlight',
      componentIcon: "keeplogo-logomark_" + appName,
      spotlightIcon: 'keeplogo-logomark_KEEP',
      searchBtnColor: '#70c1d3;',
      CIBackgroundColor: 'white',
      SIBackgroundColor: 'white',
      onlySpotlight: searchUrl === null
    });
    $('.hamburger').click(function() {
      return $('.nav-left, .nav-right').toggleClass('nav-show');
    });
    $('.nav-right .menu:nth-child(2) .submenu a').click(function() {
      var height, left, options, top, url, width;
      url = $(this).attr('href') + document.URL;
      width = 575;
      height = 400;
      left = ($(window).width() - width) / 2;
      top = ($(window).height() - height) / 2;
      options = "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
      window.open(url, '', options);
      return false;
    });
    $('.nav-logo .menu-item').on('touchstart', function(e) {
      if (!$('.nav-logo .submenu').is(':visible')) {
        $('.nav-logo .submenu').show();
        $('.nav-logo .menu-item').focus();
        return false;
      }
    });
    $('.nav-logo .menu-item').focusout(function(e) {
      return $('.nav-logo .submenu').hide();
    });
    $('.nav-logo .menu-item').click(function(e) {
      return window.location = $(this).attr('href');
    });
    $('.nav-logo .menu-item').mouseenter(function(e) {
      return $('.nav-logo .submenu').show();
    });
    $('.nav-logo .menu').mouseleave(function(e) {
      return $('.nav-logo .submenu').hide();
    });
    return $('.nav-logo .submenu-item').on('touchstart', function(e) {
      return window.location = $(this).attr('href');
    });
  };

}).call(this);
