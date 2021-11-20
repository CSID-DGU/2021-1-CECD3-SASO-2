export default function() {
  return [
    {
      title: "키워드 추가",
      to: "/keyword-input",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "평판 관리",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "문장 감정 평가",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "키워드 분석",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
