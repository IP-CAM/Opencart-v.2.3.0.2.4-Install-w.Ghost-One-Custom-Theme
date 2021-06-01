(function ($, global) {
    'use strict';

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    function getModal(variants, container, handleSubscribeCallback) {
        if (variants === 'undefined') {
            return Popup1.constructor(container, handleSubscribeCallback);
        }
        if (Array.isArray(variants) && (variants[0] + "").search('variant-2') > -1) {
            return Popup2.constructor(container, handleSubscribeCallback);
        }
        if (Array.isArray(variants) && (variants[0] + "").search('variant-3') > -1) {
            return Popup3.constructor(container, handleSubscribeCallback);
        }
        return Popup1.constructor(container, handleSubscribeCallback);
    }

    function isBlockShowPopUp() {
        if (typeof isInStandaloneMode === 'function' && (isInStandaloneMode())) {
            return true;
        }
        return false;
    }

    function isCookiesExist(cookies) {
        if (cookies && cookies.length > 0) {
            return cookies.filter(function (cookie) {
                return typeof $.cookie(cookie) !== 'undefined';
            }).length > 0;
        }
        return false;
    }

    function SubscribePopup(variants) {
        this.container = document.getElementById('subscribe-modal');
        this.modal = getModal(variants, this.container, handleSubscribe.bind(this));
        this.options = {
            disableTrackFirstVisit: isCookiesExist(['eshderevenskoeSubscribeFlag', '_ed_subscribe_flag', '_ed_subscribe_done']),
            disableTrackLeave: isCookiesExist(['_ed_subscribe_leave_flag', 'ed_customer_old', '_ed_subscribe_done']),
        };
        let options = $(this.container).data('options');
        if (options) {
            this.options = $.extend(this.options, options);
        }
        this.trackEvent = 'subscribe_from_direct_popup';
    }

    function handleSubscribe(event) {
        const email = this.modal.emailField.value;
        this.modal.submitButton.setAttribute('disabled', 'disabled');
        $.post('index.php?route=tool/subscribe/check_email', {email: email}).then((function (json) {
            $('.alert').remove();
            if (json['success']) {
                $.cookie('_ed_subscribe_done', '1', {expires: 365, path: '/'});
                this.modal.onSuccess(email);
            }
            if (json['error']) {
                this.modal.onError(json['error']);
                this.modal.submitButton.removeAttribute('disabled');
                return false;
            }
        }).bind(this));
    }

    SubscribePopup.prototype.setFieldLabel = function (text) {
    };
    SubscribePopup.prototype.setInfo = function (text) {
    };
    SubscribePopup.prototype.trackFirstVisit = function () {
        if (this.options.disableTrackFirstVisit) {
            if (!this.options.disableTrackLeave) {
                var popup2 = new EdSubscribePopup();
                popup2.trackEvent = 'subscribe_from_popup_leave';
                setTimeout(function () {
                    popup2.trackLeave();
                }, 100);
            }
            return false;
        }
        const obj = this;
        if (!isCookiesExist(['_ed_time_first_visit'])) {
            $.cookie('_ed_time_first_visit', $.now() / 1000);
        }
        let time_first_visit = $.cookie('_ed_time_first_visit');
        let now_sec = Math.round($.now() / 1000);
        let time_for_timer = 10 - (now_sec - time_first_visit);
        if (time_for_timer < 0) {
            time_for_timer = 10;
        }
        setTimeout(showPopupFirstVisit, time_for_timer * 1000);

        function showPopupFirstVisit() {
            if (typeof isInStandaloneMode === 'function' && typeof checkWebView === 'function' && typeof detectMobile === 'function' && (isInStandaloneMode() || (detectMobile() && !checkWebView()))) {
                return false;
            }
            if (!obj.options.disableTrackFirstVisit) {
                obj.trackEvent = 'subscribe_from_direct_popup';
                obj.options.disableTrackLeave = true;
                obj.options.disableTrackFirstVisit = true;
                obj.open();
            }
            $.cookie('_ed_subscribe_flag', '1', {expires: 365, path: '/'});
        }

        return true;
    };
    SubscribePopup.prototype.trackLeave = function () {
        if (this.options.disableTrackLeave) {
            return false;
        }
        if (!isCookiesExist(['_ed_time_first_visit'])) {
            $.cookie('_ed_time_first_visit', $.now() / 1000);
        }
        let time_first_visit = Math.round($.cookie('_ed_time_first_visit'));
        let now_sec_leave = Math.round($.now() / 1000);
        const obj = this;
        if (isMobileDevice()) {
            let time_for_timer_leave = 4 * 60 - (now_sec_leave - time_first_visit);
            if (time_for_timer_leave < 0) {
                time_for_timer_leave = 4 * 60;
            }
            setTimeout(function () {
                showPopupLeave();
            }, time_for_timer_leave * 1000);
        } else {
            now_sec_leave = Math.round($.now() / 1000);
            let time_for_timer_leave = 2 * 60 - (now_sec_leave - time_first_visit);
            if (time_for_timer_leave < 0) {
                time_for_timer_leave = 2 * 60;
            }
            const carrotLeave = {
                track: function () {
                    now_sec_leave = Math.round($.now() / 1000);
                    let time_lost = now_sec_leave - time_first_visit;
                    if (time_lost > time_for_timer_leave) {
                        showPopupLeave();
                    }
                }, addEvent: function (obj, event, callback) {
                    if (obj.addEventListener)
                        obj.addEventListener(event, callback, false); else if (obj.attachEvent)
                        obj.attachEvent("on" + event, callback);
                }, loadEvents: function () {
                    this.addEvent(document, "mouseout", function (e) {
                        e = e ? e : window.event;
                        var from = e.relatedTarget || e.toElement;
                        if (!from)
                            carrotLeave.track();
                    });
                }, domReady: function (callback) {
                    (document.readyState === "interactive" || document.readyState === "complete") ? callback() : this.addEvent(document, "DOMContentLoaded", callback);
                }, init: function (opts) {
                    this.domReady(function () {
                        setTimeout(function () {
                            carrotLeave.loadEvents();
                        }, 6000);
                    });
                }
            };
            carrotLeave.init({});
            return true;
        }

        function showPopupLeave() {
            if (typeof isInStandaloneMode === 'function' && typeof checkWebView === 'function' && (isInStandaloneMode() || checkWebView())) {
                return false;
            }
            if (!obj.options.disableTrackLeave && isNaN(parseInt($('#cart-total').text()))) {
                obj.trackEvent = 'subscribe_from_popup_leave';
                obj.options.disableTrackLeave = true;
                obj.options.disableTrackFirstVisit = true;
                obj.open();
                $.cookie('_ed_subscribe_leave_flag', '1', {expires: 365, path: '/'});
            }
        }
    };
    SubscribePopup.prototype.open = function () {
        this.modal.open();
        if (this.trackEvent == 'subscribe_from_direct_popup') {
            $(this.container).on('hide.bs.modal', function () {
                var popup2 = new EdSubscribePopup();
                popup2.trackEvent = 'subscribe_from_popup_leave';
                setTimeout(function () {
                    popup2.trackLeave();
                }, 100);
            });
        }
    };
    SubscribePopup.prototype.destroy = function () {
        this.modal.close();
    };
    SubscribePopup.prototype.getOptions = function () {
        return this.options;
    };
    var
        popup1_title = 'Дарим вам бесплатную доставку первого заказа!',
        popup1_intro = 'Введите ваш email, чтобы получить промокод', popup1_button = 'Подписаться';
    var Popup1 = {};
    Popup1.constructor = function (container, handleSubscribeCallback) {
        this.content = '<div class="modal fade subscribe-popup subscribe-popup--variant-1 in" role="dialog">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<h1 class="subscribe-popup__title">' + popup1_title + '</h1>'
            + '<div class="form-group text-center subscribe-popup__email-wrapper">'
            + '<div class="subscribe-popup__info">' + popup1_intro + '</div>'
            + '<input type="email" class="form-control input-lg subscribe-popup__email" id="subscribe-modal-email" placeholder="Введите ваш e-mail"/>'
            + '<button type="button" class="btn btn-success btn-lg btn-block" id="subscribe-modal-save"><span>' + popup1_button + '</span></button>'
            + '<div class="subscribe-modal-condition">Нажимая кнопку «Подписаться», Вы соглашаетесь с '
            + '<a href="/index.php?route=information/information/oferta_modal" class="oferta_modal">офертой</a> и '
            + '<a href="/index.php?route=information/information/policy_modal" class="policy_modal">политикой конфиденциальности</a>.'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="modal-footer"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
        this.baseElement = createElementFromHTML(this.content);
        this.container = container;
        this.emailField = this.baseElement.querySelector('#subscribe-modal-email');
        this.submitButton = this.baseElement.querySelector('#subscribe-modal-save');
        this.submitButton.addEventListener('click', handleSubscribeCallback);
        this.rendered = false;
        return Popup1;
    };
    Popup1.onSuccess = function () {
        this.showSuccessMessage();
        setTimeout((function () {
            this.close();
        }).bind(this), 5000);
    };
    Popup1.onError = function (error) {
        $().toastmessage('showToast', {text: error, stayTime: 6000, type: 'error'});
    };
    Popup1.close = function () {
        $(this.baseElement).modal('hide');
    };
    Popup1.open = function () {
        if (isBlockShowPopUp()) {
            return;
        }
        if (!this.rendered) {
            this.container.appendChild(this.baseElement);
            this.rendered = true;
        }
        $(this.baseElement).modal('show');
    };
    Popup1.showSuccessMessage = function () {
        this.baseElement.querySelector('.modal-body').innerHTML = '<h3 class="text-success text-center">'
            + '<strong>Спасибо за подписку!</strong>'
            + '</h3>';
    };
    var Popup2 = {};
    Popup2.constructor = function (container, handleSubscribeCallback) {
        this.content = '<div class="modal fade subscribe-popup in subscribe-popup--variant-2" role="dialog">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<h1 class="subscribe-popup__title">Узнайте об акциях<br> и скидках!</h1>'
            + '<div class="form-group text-center subscribe-popup__email-wrapper">'
            + '<div class="subscribe-popup__info">Подпишитесь на рассылку и будьте<br/> в курсе акций и новинок</div>'
            + '<input type="email" class="form-control input-lg subscribe-popup__email" id="subscribe-modal-email" placeholder="Введите ваш email"/>'
            + '<button type="button" class="btn btn-success btn-lg btn-block" id="subscribe-modal-save"><span>Подписаться</span></button>'
            + '<div class="subscribe-modal-condition">Нажимая кнопку "Подписаться", Вы соглашаетесь с <br/>'
            + '<a href="/index.php?route=information/information/oferta_modal" class="oferta_modal">офертой</a> и '
            + '<a href="/index.php?route=information/information/policy_modal" class="policy_modal">политикой конфиденциальности</a>.'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="modal-footer"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
        this.baseElement = createElementFromHTML(this.content);
        this.container = container;
        this.emailField = this.baseElement.querySelector('#subscribe-modal-email');
        this.submitButton = this.baseElement.querySelector('#subscribe-modal-save');
        this.submitButton.addEventListener('click', handleSubscribeCallback);
        this.rendered = false;
        return Popup2;
    };
    Popup2.onSuccess = function () {
        this.showSuccessMessage();
        setTimeout(function () {
            this.close();
        }, 5000);
    };
    Popup2.onError = function (error) {
        $().toastmessage('showToast', {text: error, stayTime: 6000, type: 'error'});
    };
    Popup2.close = function () {
        $(this.baseElement).modal('hide');
    };
    Popup2.open = function () {
        if (isBlockShowPopUp()) {
            return;
        }
        if (!this.rendered) {
            this.container.appendChild(this.baseElement);
            this.rendered = true;
        }
        $(this.baseElement).modal('show');
    };
    Popup2.showSuccessMessage = function () {
        this.baseElement.querySelector('.modal-body').innerHTML = '<h3 class="text-success text-center">'
            + '<strong>Спасибо за подписку!</strong>'
            + '</h3>';
    };
    var Popup3 = {};
    Popup3.constructor = function (container, handleSubscribeCallback) {
        this.content = '<div class="modal fade subscribe-popup--variant-3" role="dialog" style="display: none;">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content subscribe-modal">'
            + '<div class="modal-header subscribe-modal__header">'
            + '<button type="button" class="subscribe-modal__close" data-dismiss="modal" aria-label="Закрыть"><span aria-hidden="true"></span></button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<div class="subscribe-modal__body">'
            + '<div class="row">'
            + '<div class="col-xs-12">'
            + '<div class="subscribe-modal__title">'
            + 'Узнайте об акциях <br>и скидках!'
            + '</div>'
            + '</div>'
            + '<div class="col-xs-12">'
            + '<div class="subscribe-modal__text">'
            + 'Подпишитесь на рассылку <br>и будьте в курсе акций и новинок'
            + '</div>'
            + '</div>'
            + '<div class="col-xs-12">'
            + '<div class="subscribe-modal__email">'
            + '<input type="email" placeholder="Ваш e-mail" id="subscribe-modal-email">'
            + '<button class="js-btn-subscribe-v3-success" id="subscribe-modal-save"><span>Подписаться</span></button>'
            + '</div>'
            + '</div>'
            + '<div class="col-xs-12">'
            + '<div class="subscribe-modal__oferta">'
            + ' Нажимая кнопку “Подписаться”, <br class="visible-xs-block"> вы соглашаетесь <br'
            + ' class="hidden-xs">с <a href="/index.php?route=information/information/oferta_modal" class="oferta_modal">офертой</a>'
            + ' и <a href="/index.php?route=information/information/policy_modal" class="policy_modal">политикой <br class="visible-xs-block"> конфиденциальности</a>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="subscribe-modal__success">'
            + '<div class="subscribe-modal__success-img"></div>'
            + '<div class="subscribe-modal__success-text">'
            + 'Спасибо <br>за подписку :)'
            + '</div>'
            + '<div class="subscribe-modal__success-btn">'
            + '<button class="btn btn-lg btn-block btn-primary" data-dismiss="modal" aria-label="Закрыть"> Закрыть </button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        this.baseElement = createElementFromHTML(this.content);
        this.container = container;
        this.emailField = this.baseElement.querySelector('#subscribe-modal-email');
        this.submitButton = this.baseElement.querySelector('#subscribe-modal-save');
        this.submitButton.addEventListener('click', handleSubscribeCallback);
        this.rendered = false;
        return Popup3;
    };
    Popup3.onSuccess = function () {
        this.baseElement.querySelector('.subscribe-modal__success').classList.add('subscribe-modal__success_block');
        setTimeout(function () {
            this.baseElement.querySelector('.subscribe-modal__success').classList.add('subscribe-modal__success_show')
        }, 10);
        setTimeout(function () {
            this.close();
        }, 5000);
    };
    Popup3.onError = function (error) {
        $().toastmessage('showToast', {text: error, stayTime: 6000, type: 'error'});
    };
    Popup3.close = function () {
        $(this.baseElement).modal('hide');
    };
    Popup3.open = function () {
        if (isBlockShowPopUp()) {
            return;
        }
        if (!this.rendered) {
            this.container.appendChild(this.baseElement);
            this.rendered = true;
        }
        $(this.baseElement).modal('show');
    };
    global.EdSubscribePopup = SubscribePopup;
    if (typeof EdSubscribePopup !== 'undefined') {
        var popup = new EdSubscribePopup();
        setTimeout(function () {
            popup.trackFirstVisit();
        }, 100);
    }
})(jQuery, window);