jQuery(document).ready(function($){$(this).find(':submit').removeAttr("disabled");WDP={ajaxurl:WDP_WP.ajaxurl,nonce:WDP_WP.wdpNonce,textCounter:WDP_WP.textCounter,textCounterNum:(WDP_WP.textCounterNum!=='')?WDP_WP.textCounterNum:300,jpages:WDP_WP.jpages,numPerPage:(WDP_WP.jPagesNum!=='')?WDP_WP.jPagesNum:10,widthWrap:(WDP_WP.widthWrap!=='')?WDP_WP.widthWrap:'',autoLoad:WDP_WP.autoLoad,thanksComment:WDP_WP.thanksComment,thanksReplyComment:WDP_WP.thanksReplyComment,duplicateComment:WDP_WP.duplicateComment,insertImage:WDP_WP.insertImage,insertVideo:WDP_WP.insertVideo,insertLink:WDP_WP.insertLink,accept:WDP_WP.accept,cancel:WDP_WP.cancel,reply:WDP_WP.reply,checkVideo:WDP_WP.checkVideo,textWriteComment:WDP_WP.textWriteComment,classPopularComment:WDP_WP.classPopularComment,};jQuery('.wdp-wrap-comments').each(function(index,element){var ids=jQuery('[id=\''+this.id+'\']');if(ids.length>1){ids.slice(1).closest('.wdp-wrapper').remove()}});jQuery('.wdp-container-form [name="comment_parent"], .wdp-container-form [name="comment_post_ID"]').each(function(index,input){$(input).removeAttr('id')});if(typeof jQuery.fn.textareaCount=='function'&&WDP.textCounter=='true'){$('.wdp-textarea').each(function(){var textCount={'maxCharacterSize':WDP.textCounterNum,'originalStyle':'wdp-counter-info','warningStyle':'wdp-counter-warn','warningNumber':20,'displayFormat':'#left'};$(this).textareaCount(textCount)})}
if(typeof jQuery.fn.placeholder=='function'){$('.wdp-wrap-form input, .wdp-wrap-form textarea, #wdp-modal input, #wdp-modal textarea').placeholder()}
if(typeof autosize=='function'){autosize($('textarea.wdp-textarea'))}
$('.wdp-wrapper').each(function(){rezizeBoxComments_WDP($(this));restoreIframeHeight($(this))});$(window).resize(function(){$('.wdp-wrapper').each(function(){rezizeBoxComments_WDP($(this));restoreIframeHeight($(this))})});if($('.wdp-captcha').length){captchaValues=captcha_WDP(9);$('.wdp-captcha-text').html(captchaValues.n1+' &#43; '+captchaValues.n2+' = ')}
$(document).delegate('a.wdp-link','click',function(e){e.preventDefault();var linkVars=getUrlVars_WDP($(this).attr('href'));var post_id=linkVars.post_id;var num_comments=linkVars.comments;var num_get_comments=linkVars.get;var order_comments=linkVars.order;$("#wdp-wrap-commnent-"+post_id).slideToggle(200);var $container_comment=$('#wdp-container-comment-'+post_id);if($container_comment.length&&$container_comment.html().length===0){getComments_WDP(post_id,num_comments,num_get_comments,order_comments)}
return!1});if($('a.wdp-link').length){$('a.wdp-link.auto-load-true').each(function(){$(this).click()})}
$(document).delegate('li.wdp-item-comment','mouseover mouseout',function(event){event.stopPropagation();if(event.type==='mouseover'){$(this).find('.wdp-comment-actions:first').show()}else{$(this).find('.wdp-comment-actions').hide()}});$(document).find('.wdp-container-form').keyup(function(tecla){post_id=$(this).find('form').attr('id').replace('commentform-','');if(tecla.which==27){cancelCommentAction_WDP(post_id)}});$(document).delegate('input.wdp-cancel-btn','click',function(event){event.stopPropagation();post_id=$(this).closest('form').attr('id').replace('commentform-','');cancelCommentAction_WDP(post_id)});$(document).delegate('.wdp-reply-link','click',function(e){e.preventDefault();var linkVars=getUrlVars_WDP($(this).attr('href'));var comment_id=linkVars.comment_id;var post_id=linkVars.post_id;cancelCommentAction_WDP(post_id);var form=$('#commentform-'+post_id);form.find('[name="comment_parent"]').val(comment_id);form.find('.wdp-textarea').val('').attr('placeholder',WDP_WP.reply+'. ESC ('+WDP_WP.cancel+')').focus();form.find('input[name="submit"]').addClass('wdp-reply-action');$('#commentform-'+post_id).find('input.wdp-cancel-btn').show();scrollThis_WDP(form);return!1});$(document).delegate('.wdp-edit-link','click',function(e){e.preventDefault();var linkVars=getUrlVars_WDP($(this).attr('href'));var comment_id=linkVars.comment_id;var post_id=linkVars.post_id;cancelCommentAction_WDP(post_id);var form=$('#commentform-'+post_id);form.find('[name="comment_parent"]').val(comment_id);form.find('.wdp-textarea').val('').focus();form.find('input[name="submit"]').addClass('wdp-edit-action');scrollThis_WDP(form);getCommentText_WDP(post_id,comment_id)});$(document).delegate('.wdp-delete-link','click',function(e){e.preventDefault();var linkVars=getUrlVars_WDP($(this).attr('href'));var comment_id=linkVars.comment_id;var post_id=linkVars.post_id;if(confirm(WDP_WP.textMsgDeleteComment)){deleteComment_WDP(post_id,comment_id)}});$('input, textarea').focus(function(event){$(this).removeClass('wdp-error');$(this).siblings('.wdp-error-info').hide()});$(document).on('submit','.wdp-container-form form',function(event){event.preventDefault();$(this).find(':submit').attr("disabled","disabled");$('input, textarea').removeClass('wdp-error');var formID=$(this).attr('id');var post_id=formID.replace('commentform-','');var form=$('#commentform-'+post_id);var link_show_comments=$('#wdp-link-'+post_id);var num_comments=link_show_comments.attr('href').split('=')[2];var form_ok=!0;var $content=form.find('textarea').val().replace(/\s+/g,' ');if($content.length<2){form.find('.wdp-textarea').addClass('wdp-error');form.find('.wdp-error-info-text').show();setTimeout(function(){form.find('.wdp-error-info-text').fadeOut(500)},2500);$(this).find(':submit').removeAttr('disabled');return!1}else{if($(this).find('input#author').length){var $author=$(this).find('input#author');var $authorVal=$author.val().replace(/\s+/g,' ');var $authorRegEx=/^[^?%$=\/]{1,30}$/i;if($authorVal==' '||!$authorRegEx.test($authorVal)){$author.addClass('wdp-error');form.find('.wdp-error-info-name').show();setTimeout(function(){form.find('.wdp-error-info-name').fadeOut(500)},3000);form_ok=!1}}
if($(this).find('input#email').length){var $emailRegEx=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;var $email=$(this).find('input#email');var $emailVal=$email.val().replace(/\s+/g,'');$email.val($emailVal);if(!$emailRegEx.test($emailVal)){$email.addClass('wdp-error');form.find('.wdp-error-info-email').show();setTimeout(function(){form.find('.wdp-error-info-email').fadeOut(500)},3000);form_ok=!1}}
if(!form_ok){$(this).find(':submit').removeAttr('disabled');return!1}
if($('.wdp-captcha').length){var captcha=$('#wdp-captcha-value-'+post_id);form_ok=!0;if(captcha.val()!=(captchaValues.n1+captchaValues.n2)){form_ok=!1;captcha.addClass('wdp-error')}
captchaValues=captcha_WDP(9);$('.wdp-captcha-text').html(captchaValues.n1+' &#43; '+captchaValues.n2+' = ');captcha.val('')}
if(form_ok===!0){if(!form.find('input[name="comment_press"]').length){form.find('input[name="submit"]').after('<input type="hidden" name="comment_press" value="true">')}
comment_id=form.find('[name="comment_parent"]').val();if(form.find('input[name="submit"]').hasClass('wdp-edit-action')){editComment_WDP(post_id,comment_id)}else if(form.find('input[name="submit"]').hasClass('wdp-reply-action')){insertCommentReply_WDP(post_id,comment_id,num_comments)}else{insertComment_WDP(post_id,num_comments)}
cancelCommentAction_WDP(post_id)}
$(this).find(':submit').removeAttr('disabled')}
return!1});function getComments_WDP(post_id,num_comments,num_get_comments,order_comments){var status=$('#wdp-comment-status-'+post_id);var $container_comments=$("ul#wdp-container-comment-"+post_id);if(num_comments>0){jQuery.ajax({type:"POST",dataType:"html",url:WDP.ajaxurl,data:{action:'get_comments',post_id:post_id,get:num_get_comments,order:order_comments,nonce:WDP.nonce},beforeSend:function(){status.addClass('wdp-loading').html('<span class="wdpo-loading"></span>').show()},success:function(data){status.removeClass('wdp-loading').html('').hide();$container_comments.html(data);highlightPopularComments_WDP(post_id,$container_comments);$container_comments.show();jPages_WDP(post_id,WDP.numPerPage);toggleMoreComments($container_comments)},error:function(jqXHR,textStatus,errorThrown){clog('ajax error');clog('jqXHR');clog(jqXHR);clog('errorThrown');clog(errorThrown)},complete:function(jqXHR,textStatus){}})}
return!1}
function highlightPopularComments_WDP(post_id,$container_comments){var order=$container_comments.data('order');if(order=='likes'&&$container_comments.hasClass('wdp-multiple-comments wdp-has-likes')){var top_likes=$container_comments.find('>.wdp-item-comment').eq(0).data('likes');var temp=!1;$container_comments.find('>.wdp-item-comment').each(function(index,comment){if(!temp&&$(comment).data('likes')==top_likes){$(comment).addClass(WDP.classPopularComment);temp=!0}})}}
function jQFormSerializeArrToJson(formSerializeArr){var jsonObj={};jQuery.map(formSerializeArr,function(n,i){jsonObj[n.name]=n.value});return jsonObj}
function insertComment_WDP(post_id,num_comments){var link_show_comments=$('#wdp-link-'+post_id);var comment_form=$('#commentform-'+post_id);var status=$('#wdp-comment-status-'+post_id);var form_data=comment_form.serialize();$.ajax({type:'post',method:'post',url:comment_form.attr('action'),data:form_data,dataType:"html",beforeSend:function(){status.addClass('wdp-loading').html('<span class="wdpo-loading"></span>').show()},success:function(data,textStatus){cc('success data',data)
status.removeClass('wdp-loading').html('');if(data!="error"){status.html('<p class="wdp-ajax-success">'+WDP.thanksComment+'</p>');if(link_show_comments.find('span').length){num_comments=String(parseInt(num_comments,10)+1);link_show_comments.find('span').html(num_comments)}}else{status.html('<p class="wdp-ajax-error">Error processing your form</p>')}
$('ul#wdp-container-comment-'+post_id).prepend(data).show();jPages_WDP(post_id,WDP.numPerPage,!0)},error:function(XMLHttpRequest,textStatus,errorThrown){status.removeClass('wdp-loading').html('<p class="wdp-ajax-error" >'+WDP.duplicateComment+'</p>')},complete:function(jqXHR,textStatus){setTimeout(function(){status.removeClass('wdp-loading').fadeOut(600)},2500)}});return!1}
function insertCommentReply_WDP(post_id,comment_id,num_comments){var link_show_comments=$('#wdp-link-'+post_id);var comment_form=$('#commentform-'+post_id);var status=$('#wdp-comment-status-'+post_id);var item_comment=$('#wdp-item-comment-'+comment_id);var form_data=comment_form.serialize();$.ajax({type:'post',method:'post',url:comment_form.attr('action'),data:form_data,beforeSend:function(){status.addClass('wdp-loading').html('<span class="wdpo-loading"></span>').show()},success:function(data,textStatus){cc('success data',data)
status.removeClass('wdp-loading').html('');if(data!="error"){status.html('<p class="wdp-ajax-success">'+WDP.thanksReplyComment+'</p>');if(link_show_comments.find('span').length){num_comments=parseInt(num_comments,10)+1;link_show_comments.find('span').html(num_comments)}
if(!item_comment.find('ul').length){item_comment.append('<ul class="children"></ul>')}
item_comment.find('ul').append(data);setTimeout(function(){scrollThis_WDP(item_comment.find('ul li').last())},1000)}else{status.html('<p class="wdp-ajax-error">Error in processing your form.</p>')}},error:function(XMLHttpRequest,textStatus,errorThrown){status.html('<p class="wdp-ajax-error" >'+WDP.duplicateComment+'</p>')},complete:function(jqXHR,textStatus){setTimeout(function(){status.removeClass('wdp-loading').fadeOut(600)},2500)}});return!1}
function editComment_WDP(post_id,comment_id){var form=$("#commentform-"+post_id);var status=$('#wdp-comment-status-'+post_id);jQuery.ajax({type:"POST",url:WDP.ajaxurl,data:{action:'edit_comment_wdp',post_id:post_id,comment_id:comment_id,comment_content:form.find('.wdp-textarea').val(),nonce:WDP.nonce},beforeSend:function(){status.addClass('wdp-loading').html('<span class="wdpo-loading"></span>').show()},success:function(result){status.removeClass('wdp-loading').html('');var data=jQuery.parseJSON(result);if(data.ok===!0){$('#wdp-comment-'+comment_id).find('.wdp-comment-text').html(data.comment_text);setTimeout(function(){scrollThis_WDP($('#wdp-comment-'+comment_id))},1000)}else{console.log("Errors: "+data.error)}},complete:function(jqXHR,textStatus){setTimeout(function(){status.removeClass('wdp-loading').fadeOut(600)},2500)}});return!1}
function getCommentText_WDP(post_id,comment_id){var form=$("#commentform-"+post_id);var status=$('#wdp-comment-status-'+post_id);jQuery.ajax({type:"POST",dataType:"html",url:WDP.ajaxurl,data:{action:'get_comment_text_wdp',post_id:post_id,comment_id:comment_id,nonce:WDP.nonce},beforeSend:function(){},success:function(data){if(data!=='wdp-error'){$('#wdp-textarea-'+post_id).val(data);autosize.update($('#wdp-textarea-'+post_id));$('#commentform-'+post_id).find('input.wdp-cancel-btn').show()}else{}},complete:function(jqXHR,textStatus){}});return!1}
function deleteComment_WDP(post_id,comment_id){jQuery.ajax({type:"POST",dataType:"html",url:WDP.ajaxurl,data:{action:'delete_comment_wdp',post_id:post_id,comment_id:comment_id,nonce:WDP.nonce},beforeSend:function(){},success:function(data){if(data==='ok'){$('#wdp-item-comment-'+comment_id).remove()}}});return!1}
function toggleMoreComments($container_comments){var liComments=$container_comments.find('>li.depth-1.wdp-item-comment');liComments.each(function(index,element){var ulChildren=$(this).find('> ul.children');if(ulChildren.length&&ulChildren.find('li').length>3){ulChildren.find('li:gt(2)').css('display','none');ulChildren.append('<a href="#" class="wdp-load-more-comments">'+WDP_WP.textLoadMore+'</a>')}})}
$(document).delegate('a.wdp-load-more-comments','click',function(e){e.preventDefault();$(this).parent().find('li.wdp-item-comment').fadeIn("slow");$(this).remove()});$(document).delegate('.wdp-modal-ok','click',function(e){e.preventDefault();$('#wdp-modal input, #wdp-modal textarea').removeClass('wdp-error');var $action=$('#wdp-modal').attr('class');var post_id=$(this).attr('id').replace('wdp-modal-ok-','');switch($action){case 'wdp-modal-url':processUrl_WDP(post_id);break;case 'wdp-modal-image':processImage_WDP(post_id);break;case 'wdp-modal-video':processVideo_WDP(post_id);break}
autosize.update($('.wdp-textarea'));closeModal_WDP();return!1});$(document).delegate('#wdp-modal input, #wdp-modal textarea','focus',function(e){$(this).removeClass('wdp-error')});function closeModal_WDP(){$('#wdp-overlay, #wdp-modal').remove();return!1}
$(document).delegate('#wdp-modal-close, .wdp-modal-cancel','click',function(e){e.preventDefault();closeModal_WDP();return!1});function jPages_WDP(post_id,$numPerPage,$destroy){if(typeof jQuery.fn.jPages=='function'&&WDP.jpages=='true'){var $idList='wdp-container-comment-'+post_id;var $holder='div.wdp-holder-'+post_id;var num_comments=jQuery('#'+$idList+' > li').length;if(num_comments>$numPerPage){if($destroy){jQuery('#'+$idList).children().removeClass('animated jp-hidden')}
jQuery($holder).show().jPages({containerID:$idList,previous:"← "+WDP_WP.textNavPrev,next:WDP_WP.textNavNext+" →",perPage:parseInt($numPerPage,10),minHeight:!1,keyBrowse:!0,direction:"forward",animation:"fadeIn",})}}
return!1}
function captcha_WDP($max){if(!$max)$max=5;return{n1:Math.floor(Math.random()*$max+1),n2:Math.floor(Math.random()*$max+1),}}
function scrollThis_WDP($this){if($this.length){var $position=$this.offset().top;var $scrollThis=Math.abs($position-200);$('html,body').animate({scrollTop:$scrollThis},'slow')}
return!1}
function getUrlVars_WDP(url){var query=url.substring(url.indexOf('?')+1);var parts=query.split("&");var params={};for(var i=0;i<parts.length;i++){var pair=parts[i].split("=");params[pair[0]]=pair[1]}
return params}
function cancelCommentAction_WDP(post_id){$('form#commentform-'+post_id).find('[name="comment_parent"]').val('0');$('form#commentform-'+post_id).find('.wdp-textarea').val('').attr('placeholder',WDP.textWriteComment);$('form#commentform-'+post_id).find('input[name="submit"]').removeClass();$('form#commentform-'+post_id).find('input.wdp-cancel-btn').hide();autosize.update($('#wdp-textarea-'+post_id));$('input, textarea').removeClass('wdp-error');captchaValues=captcha_WDP(9);$('.wdp-captcha-text').html(captchaValues.n1+' &#43; '+captchaValues.n2+' = ')}
function restoreIframeHeight(wrapper){var widthWrapper=WDP.widthWrap?parseInt(WDP.widthWrap,10):wrapper.outerWidth()}
function rezizeBoxComments_WDP(wrapper){var widthWrapper=WDP.widthWrap?parseInt(WDP.widthWrap,10):wrapper.outerWidth();if(widthWrapper<=480){wrapper.addClass('wdp-full')}else{wrapper.removeClass('wdp-full')}}
function insertInTextArea_WDP(post_id,$value){var $fieldID=document.getElementById('wdp-textarea-'+post_id);if(document.selection){$fieldID.focus();var sel=document.selection.createRange();sel.text=$value;return}else if($fieldID.selectionStart||$fieldID.selectionStart=='0'){var startPos=$fieldID.selectionStart;var endPos=$fieldID.selectionEnd;var scrollTop=$fieldID.scrollTop;$fieldID.value=$fieldID.value.substring(0,startPos)+$value+$fieldID.value.substring(endPos,$fieldID.value.length);$fieldID.focus();$fieldID.selectionStart=startPos+$value.length;$fieldID.selectionEnd=startPos+$value.length;$fieldID.scrollTop=scrollTop}else{$fieldID.value+=textArea.value;$fieldID.focus()}}
function clog(msg){console.log(msg)}
function cc(msg,msg2){console.log(msg,msg2)}})