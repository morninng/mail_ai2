var Answer;
Answer = function(el){
  this.init(el);
};

Answer.prototype.init = function(el) {
  this.$el     = $(el);
  this.$editor = this.$el.find('.editor');

  this._mode = this.MODE_VIEW;
};

Answer.prototype.mode = function(mode) {
  switch (mode) {
    case this.MODE_VIEW:
      this._mode_view();
      break;
    case this.MODE_EDIT:
      this._mode_edit();
      break;
  }
};

Answer.prototype.setBody = function(string) {
  this.body = string;
  this._update();
}

Answer.prototype._update = function() {
  this.$editor.text(this.body);
}

Answer.prototype._mode_view = function() {
  this._mode = Answer.MODE_VIEW;
  this.$editor.prop('readonly', true);
  original.backCenter();
};

Answer.prototype._mode_edit = function() {
  this._mode = Answer.MODE_EDIT;
  this.$editor.prop('readonly', false);
  this.$editor.focus();
  original.goCenter();
};

Answer.prototype.MODE_VIEW = 0;
Answer.prototype.MODE_EDIT = 1;
