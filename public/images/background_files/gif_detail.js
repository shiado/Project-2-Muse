(function(a,b){var c={__click:function(b){b.preventDefault();if(!window.LOGGED_IN){a.push(['_trackEvent','Favorites','HeartClick','LoggedOut']);window.location='/login?next='+window.location.pathname+'&ref=fave';return;}var c=!this.$favoriteButtons.data('favorited');this.$favoriteButtons.removeClass('is-favorite').toggleClass('favorited',c).toggleClass('unfavorited',!c);a.push(['_trackEvent','Favorites','HeartClick','LoggedIn',this.gifId]);this._updateStatus();},__success:function(a){if(!a.result)return;this.isFavorited=a.result.has_favorited;this.update();window.showSuccess((this.isFavorited)?'Added to your favorites!':'Removed from your favorites.');},_updateStatus:function(){$.ajax({type:'POST',url:'/favorites/'+this.gifId+'/',success:$.proxy(this.__success,this)});},initialize:function(a){a=a||{};this.$el=$(a.el||'.gif-detail');this.$favoriteButtons=$();this.gifId=a.gifId||$('#gif').data('gif_id');this.isFavorited=a.isFavorited||false;this.render();return this;},render:function(){if(!this.$el.length)return;this.$favoriteButtons=this.$el.find('.favorite').hide();this.$el.on('click.gif-favorite','.favorite',$.proxy(this.__click,this));this.update();},update:function(){this.$favoriteButtons.show().toggleClass('is-favorite',this.isFavorited).data('favorited',this.isFavorited);},remove:function(){this.$el.off('.gif-favorite');}};b.GifFavorite=c;})(_gaq,Giphy);(function(a,b){var c={__success:function(a){if(a.status===200){var b=a.result;this.renderFavorite(b.is_favorite);if(b.can_edit)this.renderEdit();if(b.view_count)this.renderViewCount(b.view_count);}this.xhr=null;},initialize:function(a){a=a||{};this.$el=$(a.el||'#gif-detail');this.$editButton=$('<a class="gif-button edit"></a>');this.gifData=a.gifData||{};this.subviews={};this.xhr=null;this.render();return this;},cacheSelectors:function(){this.$navigation=this.$el.find('.gif-navigation');this.$source=this.$el.find('.gif-source');},render:function(){if(!this.$el.length)return;this.cacheSelectors();this.xhr=$.ajax({url:'/ajax/gif/'+this.gifData.gif_id+'/info',type:'GET',success:$.proxy(this.__success,this)});},renderEdit:function(){this.subviews.edit=b.GifEdit.initialize({gifId:this.gifData.gif_id,editUrl:this.gifData.editUrl,absoluteUrl:this.gifData.absoluteUrl});if(!this.$navigation.length)return;this.$editButton.attr('href',this.gifData.editUrl);this.$navigation.prepend(this.$editButton);},renderFavorite:function(a){this.subviews.favorite=b.GifFavorite.initialize({el:this.$navigation,gifId:this.gifData.gif_id,isFavorited:a||false});},renderViewCount:function(a){this.subviews.viewCount=b.GifViewCount.initialize({el:this.$source,viewCount:a});},remove:function(){if(this.xhr)this.xhr.abort();a.each(this.subviews,function(a){a.remove();});this.$editButton.attr('href','').remove();this.subviews={};this.xhr=null;}};b.GifLoggedIn=c;})(_,Giphy);(function(a){var b={__click:function(a){a.preventDefault();this.removeOverlay();},__tvClick:function(b){b.preventDefault();var c=$(b.currentTarget);a.Utils.openPopup(c.attr('href'),480,280);},__tileClick:function(a){a.preventDefault();this.renderOverlay(true);},__fullscreenClick:function(a){a.preventDefault();this.renderOverlay();},__windowKeydown:function(a){if(a.which===27)this.removeOverlay();},_updatePositionStyles:function(){if(!this.isOverlayed||!this.$gif.length)return;var a=this.$gif.offset();this.$overlay.css({height:this.$gif.height(),width:this.$gif.width(),left:a.left,top:a.top-this.$win.scrollTop()});},_updateUrl:function(a){if(!window.history||!this.$gif.length)return;var b=this.$gif.data('absoluteUrl');if(this.isOverlayed)b+=a?'/tile':'/fullscreen';window.history.replaceState(window.history.state,document.title,b);},initialize:function(a){a=a||{};this.$win=$(window);this.$body=$('body');this.$gif=$();this.$overlay=$('<div class="gif-mode-overlay"></div>');this.animationDuration=a.animationDuration||400;this.isOverlayed=false;this.isTile=false;this.timeout=null;this.render();return this;},render:function(){this.$body.on('click.gif-modes','.gif-button.tv',$.proxy(this.__tvClick,this));this.$body.on('click.gif-modes','.gif-button.tile',$.proxy(this.__tileClick,this));this.$body.on('click.gif-modes','.gif-button.fullscreen',$.proxy(this.__fullscreenClick,this));},renderOverlay:function(a){this.$gif=this.$body.find('#gif');if(this.isOverlayed||!this.$gif.length)return;a=a||false;var b=this.$gif.width()+'px '+this.$gif.height()+'px';var c=this.$gif.data();if(this.timeout){clearTimeout(this.timeout);this.timeout=null;}this.isOverlayed=true;this.isTile=a;this._updatePositionStyles();this.$overlay.removeClass('animate').toggleClass('tile',a).toggleClass('fullscreen',!a).css({backgroundImage:'url('+this.$gif.attr('src')+')',backgroundSize:a?b:'cover'}).appendTo(this.$body).one('click',$.proxy(this.__click,this));this.$win.on('scroll.gif-modes',$.proxy(this._updatePositionStyles,this));this.$win.on('resize.gif-modes',$.proxy(this._updatePositionStyles,this));this.$win.on('keydown.gif-modes',$.proxy(this.__windowKeydown,this));this.timeout=setTimeout($.proxy(function(){this.$overlay.addClass('animate');this._updateUrl(a);if(a)this.$overlay.css('background-size',c.originalWidth+'px '+c.originalHeight+'px');},this),100);},removeOverlay:function(a){a=a||false;if(!a&&!this.isOverlayed)return;if(this.timeout){clearTimeout(this.timeout);this.timeout=null;}this.$overlay.removeClass('animate updated');this.$win.off('.gif-modes');this.isOverlayed=false;this.isTile=false;if(this.$overlay.hasClass('tile'))this.$overlay.css('background-size',this.$gif.width()+'px '+this.$gif.height()+'px');if(a)this.$overlay.remove();else this._updateUrl();this.timeout=setTimeout($.proxy(function(){this.$overlay.removeClass('tile fullscreen').remove();},this),this.animationDuration);},update:function(){if(!this.isOverlayed)return;this.$gif=this.$body.find('#gif');if(!this.$gif.length){this.removeOverlay();return;}this.$overlay.addClass('updated').css('background-image','url('+this.$gif.data('image_url')+')');if(this.isTile)this.$overlay.css('background-size',this.$gif.data('originalWidth')+'px '+this.$gif.data('originalHeight')+'px');this._updatePositionStyles();this._updateUrl();},remove:function(){this.removeOverlay(true);this.$body.off('.gif-modes');}};a.GifModes=b;})(Giphy);(function(a,b){var c={__beforeUnload:function(){},__ready:function(c){this.history=c;if(this.gifData){var d={id:this.gifData.gif_id,url:this.gifData.absoluteUrl,preview:this.gifData.previewImageUrl};var e=a.find(this.history,function(a){return a.url===d.url;});if(!e)this.history.unshift(d);}this.updatePositionByUrl(window.location.pathname);this.isFetching=false;b.Events.trigger('gifnavigation:ready',this.getData());},__update:function(c){if(!c)return;this.history=a.union(this.history,c);this.isFetching=false;b.Events.trigger('gifnavigation:update',this.getData());},initialize:function(a){a=a||{};this.position=0;this.history=null;this.isFetching=true;this.gifData=a.gifData||null;b.GifRouter.getMoreGifs().done($.proxy(this.__ready,this));return this;},next:function(){if(!this.history.length||this.position>=this.history.length-1)return;this.position++;if(!this.isFetching&&this.position>=this.history.length-10)this.getMoreGifs();var a=this.getData();b.Events.trigger('gifnavigation:next',a);return a;},previous:function(){if(!this.history.length||this.position<=0)return;this.position--;var a=this.getData();b.Events.trigger('gifnavigation:previous',a);return a;},updatePositionByUrl:function(a){if(!this.history.length||!a)return;this.position=0;for(var b=0;b<this.history.length;b++){var c=this.history[b];if(!c.url)return;var d=c.url.replace(/^\/|\/$/g,'');var e=a.replace(/^\/|\/$/g,'');if(d===e){this.position=b;break;}}},getMoreGifs:function(){this.isFetching=true;b.GifRouter.getMoreGifs().done($.proxy(this.__update,this)).fail($.proxy(function(){this.isFetching=false;},this));},getData:function(){if(!this.history.length)return;var a={};a.current=this.history[this.position];a.previous=this.history[this.position-1];a.next=this.history[this.position+1];return a;}};b.GifNavigation=c;})(_,Giphy);(function(a,b){var c={__success:function(c){var d=$('<div></div>').html(c);var e=d.find('.related-content');var f=d.find('.hoverable').clone();var g=a.sample(f,this.maxGifs);e.html('').append(g);this.$el.html('').append(e);this.xhr=null;$.when.apply(window,a.map(g,function(a){var c=$(a);var d=c.find('img');var e=c.find('.gif-link').addClass('loading');e.height(e.width()/d.data('ratio'));return b.Utils.preloadImage(d.attr('src')).done(function(){e.removeClass('loading');}).fail(function(){c.remove();});},this)).done(function(){if(b.Homepage)b.Homepage.attachHovers();});},__error:function(){this.xhr=null;this.remove();},initialize:function(a){a=a||{};this.$el=$(a.el||'#related-container');this.gifData=a.gifData||{};this.maxGifs=a.maxGifs||5;this.xhr=null;this.render();return this;},render:function(){if(!this.$el.length||!a.size(this.gifData.absoluteUrl))return;this.xhr=$.ajax({url:this.gifData.absoluteUrl+'/related',timeout:5000,success:$.proxy(this.__success,this),error:$.proxy(this.__error,this)});},remove:function(){if(!this.$el.length)return;this.$el.html('');if(this.xhr){this.xhr.abort();this.xhr=null;}}};b.GifRelated=c;})(_,Giphy);(function(a){var b={trackView:function(a){var b=$.ajax({type:"post",url:"/ajax/gif/"+a+"/analytic/view",data:{},success:function(a){return a;},error:function(){return null;}});return b;}};a.GifTracking=b;})(Giphy);(function(a,b){var c={_getCount:function(){var a=this.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");a+=' views';return a;},initialize:function(a){a=a||{};this.$el=(a.el||'.gif-source');this.viewCount=a.viewCount||0;this.render();return this;},render:function(){if(!this.$el||this.viewCount<1)return;this.$el.append(this.template({count:this._getCount()}));},remove:function(){if(!this.$el.length)return;this.$el.find('.view-count').remove();this.viewCount=0;},template:a.template('<div class="view-count"><%- count %></div>')};b.GifViewCount=c;})(_,Giphy);(function(a){var b={__beforeUnload:function(){if(!window.sessionStorage)return;window.sessionStorage.setItem('giphy_history',null);},__popstate:function(a){var b=a.originalEvent.state;if(!b)return;if(b.gif){this.refresh(b);this.navigation.updatePositionByUrl(window.location.pathname);}},__keydown:function(a){var b=$(a.target);if((b.is(':input')||b.is('div[contenteditable="true"]'))&&b.attr('id')!=='search-box')return;switch(a.which){case 39:a.preventDefault();var c=this.navigation.next();if(c&&c.current)this.navigateTo(c.current.url);break;case 37:a.preventDefault();var c=this.navigation.previous();if(c&&c.current)this.navigateTo(c.current.url);break;case 38:if(this.modes){a.preventDefault();this.modes.renderOverlay(a.shiftKey||a.metaKey);}break;case 40:if(this.modes&&this.modes.isOverlayed){a.preventDefault();this.modes.removeOverlay();}break;}},__editToggle:function(){this.navigateTo(window.location.pathname);},__editClick:function(b){b.preventDefault();if(a.GifEdit)a.GifEdit.toggleEditMode(true);},__navigationReady:function(a,b){this._updateArrows(b);},__arrowClick:function(a){a.preventDefault();var b=$(a.currentTarget);var c=b.hasClass('previous-button');var d=c?this.navigation.previous():this.navigation.next();if(d.current)this.navigateTo(d.current.url);},_updateArrows:function(a){if(!a)return;if(a.previous){var b=a.previous.preview||'';this.$arrows.show();this.$previousArrow.show().find('.preview').css('background-image','url('+b+')');}else this.$previousArrow.hide();if(a.next){var b=a.next.preview||'';this.$arrows.show();this.$nextArrow.show().find('.preview').css('background-image','url('+b+')');}else this.$nextArrow.hide();},initialize:function(b){b=b||{};this.$win=$(window);this.$body=$('body');this.$el=$('#gif-detail');this.$gif=$();this.$arrows=$();this.gifData={};this.subviews={};this.isMp4=false;this.enableNavigation=b.disableNavigation||false;this.routerMap={actions:'#gif-actions-wrapper',gif:{meta:'.gif-meta',figure:'.gif-figure',navigation:'.gif-navigation',source:'.gif-source',tv:'.gif-button.tv'},metadata:'.gif-figure-wrapper',tags:'#tags-wrapper'};if(!b.disableNavigation)this.navigation=a.GifNavigation.initialize({gifData:$('#gif').data()});this.modes=a.GifModes.initialize();this.render(true);this.$win.on('popstate',$.proxy(this.__popstate,this));this.$win.on('keydown',$.proxy(this.__keydown,this));this.$win.on('beforeunload',$.proxy(this.__beforeUnload,this));a.Events.on('gifnavigation:ready',$.proxy(this.__navigationReady,this));a.Events.on('gifnaviagtion:update',$.proxy(this.__navigationReady,this));},render:function(b){if(!this.$el.length)return;this.$gif=this.$el.find('#gif');this.$arrows=this.$el.find('.gif-arrows');this.$previousArrow=this.$arrows.find('.previous-button');this.$nextArrow=this.$arrows.find('.next-button');if(b)this.$arrows.hide();else this._updateArrows(this.navigation.getData());this.gifData=this.$gif.data();this.html5Player();this.subviews.loggedIn=a.GifLoggedIn.initialize({el:this.$el,gifData:this.gifData});this.subviews.related=a.GifRelated.initialize({gifData:this.gifData});if(a.GifActions)a.GifActions.initialize({truncateSocialLinks:false});this.$el.on('click.gif-detail','.gif-navigation .edit',$.proxy(this.__editClick,this));this.$el.on('click.gif-detail','.gif-arrows .next-button',$.proxy(this.__arrowClick,this));this.$el.on('click.gif-detail','.gif-arrows .previous-button',$.proxy(this.__arrowClick,this));a.Events.on('gifedit:toggle',$.proxy(this.__editToggle,this));setTimeout($.proxy(function(){this.$el.removeClass('no-animate');},this),100);},remove:function(){this.$el.off('.gif-detail').addClass('no-animate');for(var b in this.subviews){this.subviews[b].remove();this.subviews[b]=null;}if(a.GifActions)a.GifActions.remove();this.gifData=null;this.subviews={};this.isMp4=false;a.Events.off('gifedit:toggle');},html5Player:function(){var b=a.Utils.getParameterByName('html5');var c=a.Utils.canPlayMP4();var d=this.$gif.closest('.gif-figure');if(!b||b!=='true'||!c)return;var e=$('<video>',{id:'gif-mp4',height:this.$gif.height(),width:this.$gif.width(),poster:this.gifData.still,autoplay:true,loop:true});e.data('original-height',this.gifData.originalHeight).data('original-width',this.gifData.originalWidth).append('<source src="'+this.gifData.mp4_url+'" type="video/mp4"></source>');d.empty().append(e);this.isMp4=true;},navigateTo:function(b){if(!b)return;a.GifRouter.navigateTo(b).done($.proxy(this.refresh,this));},refresh:function(a){this.remove();for(var b in this.routerMap)if(b==='gif'){var c=this.$el.find('#gif-wrap');var d=$('<div></div>').html(a[b]);for(var e in this.routerMap[b]){var f=this.routerMap[b][e];var g=c.find(f);if(g.length)g.replaceWith(d.find(f));}}else if(b==='metadata'){var h=this.$el.find(this.routerMap[b]);h.find('meta').remove();h.prepend(a[b]);}else this.$el.find(this.routerMap[b]).html(a[b]);this.render();this.modes.update();}};a.GifDetail=b;})(Giphy);