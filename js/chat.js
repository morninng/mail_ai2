var Chat;
Chat = function(el) {
  this.init(el);
  this._isShow = true;
}

Chat.prototype.init = function(el) {
  this.$el = $(el);
  this.$msgs = this.$el.find("#conversation_container");
  this._timer = null;
};

Chat.prototype.isShow = function() {
  return this._isShow;
};

Chat.prototype.hide = function() {
  this.$el.addClass('is-hide');
  this._isShow = false;
};

Chat.prototype.show = function() {
  this.$el.removeClass('is-hide');
  this._isShow = true;
};

Chat.prototype.scrollBottom = function() {
  console.log(this.$el);
  console.log(this.$el[0].scrollHeight);
  this.$msgs.animate({scrollTop: this.$msgs[0].scrollHeight}, 0);
};