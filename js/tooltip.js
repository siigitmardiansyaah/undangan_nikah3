(function($){var WidgetElements_TooltipHandler=function($scope,$){var elementSettings=dceGetElementSettings($scope);if(!elementSettings.dce_enable_tooltip){return}
var deviceMode=$('body').attr('data-elementor-device-mode');var maxWidth=parseInt(elementSettings.dce_tooltip_max_width.size)||200;if(deviceMode=='tablet'){maxWidth=parseInt(elementSettings.dce_tooltip_max_width_tablet.size)||200}else if(deviceMode=='mobile'){maxWidth=parseInt(elementSettings.dce_tooltip_max_width_mobile.size)||200}
var selector='';switch($scope.data('widget_type')){case 'button.default':case 'dce_pdf_button.default':case 'dce_add_to_calendar.default':case 'paypal-button.default':selector='.elementor-button';break;case 'button.default':selector='image';break;case 'icon.default':selector='.elementor-icon';break;case 'video.default':selector='.elementor-wrapper';break;default:selector=''}
var target=$scope;if(selector){target=$scope.find(selector)}
if(target.length){target=target.toArray()}else{console.error('Dynamic.ooo Tooltip: Selector not found');return}
var arrow=Boolean(elementSettings.dce_tooltip_arrow)||!1;var followCursor=!1;switch(elementSettings.dce_tooltip_follow_cursor){case 'false':followCursor=!1;break;case 'true':followCursor=!0;break;case 'horizontal':followCursor='horizontal';break;case 'vertical':followCursor='vertical';break;case 'initial':followCursor='initial';break}
if(elementSettings.dce_tooltip_content){tippy(target,{content:elementSettings.dce_tooltip_content,arrow:arrow,allowHTML:!0,followCursor:followCursor,maxWidth:maxWidth,theme:'theme_'+$scope.data('id'),zIndex:parseInt(elementSettings.dce_tooltip_zindex),})}};$(window).on('elementor/frontend/init',function(){elementorFrontend.hooks.addAction('frontend/element_ready/global',WidgetElements_TooltipHandler)})})(jQuery)