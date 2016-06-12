var maildraft = {
  head : [],
  body : [],
  footer : []
}

function makeMailDraft(type, to, from) {
  if (maildraft.head.length < 1) {
    if (type) {
      maildraft.template_type = type;
    }
    switch (maildraft.template_type) {
      case "default":
        maildraft.head.push(to + "様");
        maildraft.head.push("");
        maildraft.head.push("いつもお世話になっております。" + from + "です。");
        maildraft.head.push("");

        maildraft.footer.push("宜しくお願いいたします。");
      break;
      case "office":
        maildraft.head.push(to + "さん");
        maildraft.head.push("");
        maildraft.head.push("お疲れ様です。" + from + "です。");
        maildraft.head.push("");

        maildraft.footer.push("宜しくお願いいたします。");
      break;
      case "apology":
        maildraft.head.push(to + "様");
        maildraft.head.push("");
        maildraft.head.push("いつもお世話になっております。" + from + "です。");
        maildraft.head.push("");
        maildraft.head.push("この度は大変申し訳ございませんでした。");
        maildraft.head.push("");

        maildraft.footer.push("今後はよりよいサービスを提供できるよう努めてまいります。");
        maildraft.footer.push("引き続き、何卒宜しくお願いいたします。");
      break;
    }
  }
}

function addMailDraft(add) {
  maildraft.body.push(add);
  maildraft.body.push([""]);
}

function getMailDraft() {
  var mail = "";
  for (var i = 0;i < maildraft.head.length; i++) {
    mail += maildraft.head[i] + "\n";
  }
  for (var i = 0;i < maildraft.body.length; i++) {
    for (var j = 0;j < maildraft.body[i].length; j++) {
      mail += maildraft.body[i][j] + "\n";
    }
  }
  for (var i = 0;i < maildraft.footer.length; i++) {
    mail += maildraft.footer[i] + "\n";
  }
  return mail;
}
