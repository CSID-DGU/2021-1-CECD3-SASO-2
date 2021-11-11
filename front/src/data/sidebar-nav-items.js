export default function() {
  return [
    {
      title: "키워드 입력",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }, 
    {
      title: "평판 관리",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    // {
    //   title: "Blog Posts",
    //   htmlBefore: '<i class="material-icons">vertical_split</i>',
    //   to: "/blog-posts",
    // },
    {
      title: "문장 감정 평가",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: "/user-profile-lite",
    // },
    
  ];
}
