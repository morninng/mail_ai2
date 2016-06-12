var Original;
Original = function(el) {
  this.init(el);
}

Original.prototype.init = function(el) {
  this.$el = $(el);
};

Original.prototype.goCenter = function() {
  this.$el.addClass("is-center");
};

Original.prototype.backCenter = function() {
  this.$el.removeClass("is-center");
};