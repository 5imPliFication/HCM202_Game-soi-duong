const STAT_KEYS = ["dantoc", "khoahoc", "daichung", "trithuc", "daoduc", "doanket", "phucloi", "kinhte"];

export const SCENARIOS = {
  m1: [
    {
      id: "m1s1",
      order: 1,
      title: "Văn hóa chỉ là chuyện hát múa?",
      thesis: "Văn hóa theo nghĩa rộng gồm những phương thức sinh hoạt và biểu hiện do con người sáng tạo ra để đáp ứng nhu cầu sống.",
      context:
        "Đầu năm sau Cách mạng Tháng Tám, làng đang bàn việc dựng lại nhà sinh hoạt chung. Bác Hai nói: “Văn hóa là chuyện dựng cờ, hát múa, mở hội. Còn học chữ, làm ruộng, giữ vệ sinh thì đâu phải văn hóa; mà đi lo thì lo cái ăn trước đã.”",
      prompt: "Anh hồi đáp thế nào để bác Hai hiểu đúng về văn hóa?",
      choices: [
        {
          label: "“Đúng vậy, văn hóa là chuyện vui chơi, lễ hội; học chữ với làm ăn là chuyện khác.”",
          hint: "Chấp nhận quan niệm hẹp, coi văn hóa chỉ là lễ hội, văn nghệ.",
          deltas: { khoahoc: -6, trithuc: -5, daichung: -3 },
          explanation:
            "Quan niệm hẹp tách văn hóa ra khỏi đời sống. Theo Hồ Chí Minh, văn hóa có nghĩa rộng - học tập, đạo đức, lao động, vệ sinh, phong tục đều là những biểu hiện do con người sáng tạo ra để đáp ứng nhu cầu sống, không chỉ là lễ hội.",
          depth:
            "Nếu coi văn hóa chỉ là lễ hội, ca hát thì giáo dục, lao động, vệ sinh sẽ bị xếp ra ngoài phạm vi cần chăm lo. Theo quan niệm của Hồ Chí Minh, một dân tộc vừa dốt vừa không biết cách tổ chức đời sống thì khó đứng vững. Cách nhìn hẹp này khiến cộng đồng dễ bỏ bê tri thức và lối sống - chính là gieo mầm cho những lệch lạc về sau.",
        },
        {
          label: "“Bác ơi, học chữ, làm ruộng sạch sẽ, giữ vệ sinh cũng là văn hóa; văn hóa bao trùm cả đời sống, chứ không chỉ lễ hội.”",
          hint: "Giải thích để bác Hai thấy văn hóa hiện diện trong toàn bộ sinh hoạt.",
          correct: true,
          deltas: { dantoc: 3, khoahoc: 3, trithuc: 2 },
          explanation:
            "Đúng tinh thần “văn hóa có nghĩa rộng”: các hoạt động học tập, lao động, vệ sinh và lối sống đều là biểu hiện văn hóa do con người sáng tạo ra để đáp ứng nhu cầu sống. Văn hóa không chỉ là văn học, nghệ thuật hay lễ hội.",
          depth:
            "Đề cương văn hóa Việt Nam năm 1943 đã nêu ba nguyên tắc xây dựng nền văn hóa mới: dân tộc hóa, khoa học hóa và đại chúng hóa. Từ đó, Hồ Chí Minh thường nhắc rằng văn hóa không dừng ở văn nghệ, lễ hội; nó hiện diện khắp nơi trong cách ăn, ở, mặc, học tập, lao động, vệ sinh và giao tiếp. Hiểu đúng nghĩa rộng này giúp cộng đồng không tách “chuyện làm ăn” với “chuyện văn hóa”, mà thấy mọi mặt đời sống đều cần được nâng lên - đó là gốc để xây đời sống mới sau này.",
        },
        {
          label: "“Chuyện này không quan trọng; cứ theo ý bác, miễn là làng đừng gây lộn.”",
          hint: "Né tránh cuộc bàn luận, để mặc quan niệm lệch lạc tiếp diễn.",
          deltas: { khoahoc: -3, daoduc: -3 },
          explanation:
            "Né tránh bàn luận khiến quan niệm lệch lạc cứ tái diễn trong làng. Văn hóa có vai trò soi đường, giúp nhân dân phân biệt tiến bộ với lạc hậu, đúng đắn với sai lệch; im lặng là bỏ phí cơ hội đó.",
        },
        {
          label: "“Văn hóa còn gắn với học chữ, dựng trường, giữ vệ sinh; chúng ta đưa cả những việc ấy vào kế hoạch xây dựng làng.”",
          hint: "Biến quan niệm rộng về văn hóa thành việc làm cụ thể cho cả làng.",
          deltas: { khoahoc: 6, trithuc: 6, phucloi: 4, daichung: 4 },
          explanation:
            "Biến quan niệm rộng về văn hóa thành hành động: văn hóa gồm giáo dục, lối sống và phúc lợi của nhân dân, không dừng ở lễ hội. Văn hóa vừa là mục tiêu vừa là động lực cho đời sống cộng đồng.",
        },
      ],
    },
    {
      id: "m1s2",
      order: 2,
      title: "Việc nào thuộc về văn hóa?",
      thesis: "Văn hóa gắn bó với chính trị và kinh tế, tác động qua lại, không đứng ngoài đời sống.",
      context:
        "Ủy ban làng đưa ra các việc trong năm: mở lớp bình dân học vụ, phát động vệ sinh làng xóm, tu sửa đình làng, lập tổ tự quản giữ gìn trật tự, mở lớp dạy nghề cho thanh niên. Có người đề nghị chỉ gọi các việc lễ hội, văn nghệ là văn hóa; còn khoan giếng, học chữ, giữ trật tự thì tính việc khác.",
      prompt: "Anh nhận định thế nào về các hoạt động trên?",
      choices: [
        {
          label: "Học chữ, vệ sinh, trật tự, dạy nghề đều là biểu hiện của văn hóa trong đời sống, cần làm cùng nhau.",
          hint: "Xếp tất cả các hoạt động vào phạm vi văn hóa theo nghĩa rộng.",
          correct: true,
          deltas: { khoahoc: 3, trithuc: 4, daichung: 3 },
          explanation:
            "Văn hóa có nghĩa rộng: học tập, ý thức pháp luật, lao động sản xuất, lối sống đều là phương thức sinh hoạt do con người tạo ra để đáp ứng nhu cầu sống. Mỗi việc trên đều là biểu hiện văn hóa của cộng đồng.",
          depth:
            "Hồ Chí Minh xác định văn hóa gắn bó mật thiết với chính trị và kinh tế: nó không đứng ngoài mà thấm vào cách tổ chức đời sống, cách mọi người hợp tác và cách sản xuất được nâng cấp. Trong thực tiễn Việt Nam, phong trào bình dân học vụ, vệ sinh phòng bệnh, đời sống mới đều là những hoạt động văn hóa theo nghĩa rộng chứ không phải việc riêng của từng ngành. Xếp chúng vào chung một kế hoạch là cách làm đúng tinh thần một nền văn hóa dân tộc, khoa học, đại chúng.",
        },
        {
          label: "Chỉ việc tu sửa đình, mở hội là văn hóa; còn học chữ, giữ trật tự, làm ăn tính riêng.",
          hint: "Giữ quan niệm hẹp, tách nhiều mặt đời sống ra khỏi văn hóa.",
          deltas: { khoahoc: -5, trithuc: -5, daichung: -4 },
          explanation:
            "Đó là quan niệm hẹp, tách văn hóa khỏi toàn bộ đời sống. Văn hóa không chỉ là lễ hội, văn nghệ; nó gắn bó với chính trị và kinh tế, tác động qua lại với các lĩnh vực này.",
        },
        {
          label: "Dạy nghề với học chữ thiết thực hơn; lễ hội và sinh hoạt cộng đồng tạm gác lại vài năm.",
          hint: "Tạm hoãn hoàn toàn sinh hoạt văn hóa để lo việc kinh tế.",
          deltas: { dantoc: -4, doanket: -2, daichung: -2 },
          explanation:
            "Gác hẳn sinh hoạt văn hóa cộng đồng khiến đời sống tinh thần bị bỏ trống. Văn hóa vừa là mục tiêu vừa là động lực của cách mạng; cần xây dựng song song với kinh tế, không xếp sau.",
        },
        {
          label: "Tổ chức theo thứ tự: kinh tế trước, văn hóa sau; khi dân giàu rồi hẵng lo văn hóa.",
          hint: "Tách rời văn hóa khỏi kinh tế, trì hoãn văn hóa đến khi “có điều kiện”.",
          deltas: { kinhte: 4, khoahoc: -3, daichung: -4 },
          explanation:
            "Tách văn hóa khỏi kinh tế khiến văn hóa mãi bị hoãn lại. Theo tư tưởng Hồ Chí Minh, văn hóa gắn bó với chính trị và kinh tế; không thể chỉ lo cái ăn rồi mới tính đến văn hóa.",
        },
      ],
    },
    {
      id: "m1s3",
      order: 3,
      title: "Văn hóa để làm gì?",
      thesis: "Văn hóa vừa là mục tiêu, vừa là động lực, là ngọn đèn soi đường cho quốc dân đi.",
      context:
        "Trong buổi sinh hoạt, vài người băn khoăn: “Lo no cái bụng đã; còn chuyện văn hóa liệu có phải là phù phiếm, tốn kém không?” Anh cần trả lời để mọi người hiểu rõ vai trò của văn hóa trong đời sống.",
      prompt: "Văn hóa có vai trò gì trong đời sống?",
      choices: [
        {
          label: "Văn hóa là mục tiêu, là động lực, là ngọn đèn soi đường cho nhân dân phân biệt tiến bộ với lạc hậu.",
          hint: "Khẳng định vị trí mục tiêu – động lực của văn hóa trong đời sống.",
          correct: true,
          deltas: { dantoc: 2, khoahoc: 2, daichung: 3, trithuc: 2 },
          explanation:
            "Hồ Chí Minh xác định văn hóa vừa là mục tiêu của cách mạng (độc lập, tự do, hạnh phúc, đời sống tốt đẹp) vừa là động lực (tri thức, đạo đức, yêu nước, đoàn kết). Văn hóa soi đường cho quốc dân đi.",
          depth:
            "Kháng chiến kiến quốc lúc khó khăn, Hồ Chí Minh vẫn khẳng định văn hóa không phải “lo sau”, mà phải “soi đường cho quốc dân đi”. Văn hóa vừa là mục tiêu phấn đấu (đời sống ấm no, tự do, hạnh phúc, dân chủ) vừa là động lực (tri thức, đạo đức, lòng yêu nước, sự đoàn kết giúp quốc dân vượt gian khó). Quan niệm này giải thích vì sao hoạt động văn hóa của làng không phải khoản chi “phù phiếm” mà là khoản đầu tư nền tảng cho mọi việc khác.",
        },
        {
          label: "Văn hóa chỉ để giải trí, thư giãn sau những buổi lao động mệt nhọc.",
          hint: "Hạ thấp vai trò văn hóa thành thú vui phụ thêm.",
          deltas: { khoahoc: -4, daichung: -3 },
          explanation:
            "Hạ thấp vai trò văn hóa thành trò tiêu khiển. Trong tư tưởng Hồ Chí Minh, văn hóa là mục tiêu và động lực của sự phát triển, không phải thú vui phụ thêm sau khi đã lo đủ việc khác.",
        },
        {
          label: "Văn hóa là để bảo tồn những gì cha ông để lại; còn lại cứ thay mới theo thời đại.",
          hint: "Chỉ giữ gìn bề nổi truyền thống mà thiếu chiều hướng khoa học, tiến bộ.",
          deltas: { dantoc: 5, khoahoc: -4 },
          explanation:
            "Chỉ giữ gìn bề nổi mà thiếu chiều khoa học, tiến bộ có thể dẫn tới bảo thủ. Văn hóa phải giúp phân biệt tiến bộ với lạc hậu, không phải giữ nguyên hoặc xóa bỏ máy móc.",
        },
        {
          label: "Văn hóa phục vụ nhân dân; ai cũng được học, được hưởng - đó là việc chung của cả làng.",
          hint: "Đặt nhân dân làm trung tâm của hoạt động văn hóa.",
          deltas: { daichung: 7, trithuc: 6, doanket: 3 },
          explanation:
            "Văn hóa phải thuộc về và phục vụ nhân dân, hướng tới lợi ích của quần chúng - nền tảng của tính đại chúng. Văn hóa phổ biến cho mọi người cũng chính là xây dựng sức mạnh cộng đồng.",
        },
      ],
    },
  ],
  m2: [
    {
      id: "m2s1",
      order: 1,
      title: "Lớp học đầu tiên",
      thesis: "“Một dân tộc dốt là một dân tộc yếu”; ai biết chữ dạy người chưa biết chữ.",
      context:
        "Sau Cách mạng Tháng Tám, trong làng phần lớn người lớn mù chữ. Ủy ban muốn mở lớp bình dân học vụ nhưng chưa có trường, người biết chữ ít, bà con lại bận việc đồng áng.",
      prompt: "Anh tổ chức lớp học đầu tiên của làng thế nào?",
      choices: [
        {
          label: "Huy động những người biết chữ - kể cả phụ nữ và thanh niên - làm thầy, mở lớp buổi tối cho bà con.",
          hint: "Dựa vào lực lượng tại chỗ để mở lớp ngay từ những ngày đầu.",
          deltas: { trithuc: 7, daichung: 6, doanket: 4 },
          explanation:
            "Đúng phương châm bình dân học vụ: ai biết chữ dạy người chưa biết chữ. Hồ Chí Minh chủ trương dựa vào nhân dân, chống giặc dốt như chống giặc đói, giặc ngoại xâm - việc học của làng do chính làng đảm đương.",
        },
        {
          label: "Chờ huyện cử giáo viên và cấp trường chính quy, khi nào có đủ thì mới mở lớp.",
          hint: "Trì hoãn việc học trong khi dân trí còn thấp.",
          deltas: { khoahoc: -4, trithuc: -4, daichung: -3 },
          explanation:
            "Trì hoãn khiến một dân tộc dốt vẫn là một dân tộc yếu. Việc học không chờ điều kiện đầy đủ; theo Hồ Chí Minh phải tận dụng mọi hình thức, mọi lực lượng để nâng cao dân trí kịp thời.",
        },
        {
          label: "Chỉ mở lớp buổi tối cho nam giới độ tuổi đi họp; phụ nữ và người già để tính sau.",
          hint: "Loại bớt một bộ phận nhân dân ra khỏi việc học.",
          deltas: { trithuc: -3, daichung: -5, doanket: -2 },
          explanation:
            "Văn hóa phục vụ toàn dân không loại trừ ai. Hồ Chí Minh đặc biệt quan tâm đến phụ nữ và người nghèo; gạt bỏ họ khỏi việc học làm mất bản chất đại chúng của nền văn hóa mới.",
        },
        {
          label: "Bố trí lịch học xen giữa lúc nông nhàn, mở lớp tối cho người lớn và lớp ngày cho trẻ em.",
          hint: "Sắp xếp việc học phù hợp với nhịp lao động của dân.",
          correct: true,
          deltas: { trithuc: 6, daichung: 2, kinhte: 1 },
          explanation:
            "Học đi đôi với hành, lý luận gắn liền với thực tế. Sắp xếp việc học theo nhịp sống lao động vừa nâng cao dân trí vừa không cản trở sản xuất - cách làm thiết thực của chủ trương chống giặc dốt.",
          depth:
            "Ngay sau Cách mạng Tháng Tám, Hồ Chí Minh kêu gọi toàn dân chống “giặc dốt” với khẩu hiệu “Một dân tộc dốt là một dân tộc yếu”. Phong trào bình dân học vụ lan khắp nơi: ai biết chữ dạy người chưa biết chữ, lớp học mở ngay ở nhà dân, đình làng và sắp theo nhịp thời vụ để không cản trở sản xuất. Xếp việc học vào lúc nông nhàn, cho trẻ lớp ngày và người lớn lớp tối là cách làm rất thực tế của phong trào đó - nâng dân trí ngay trong điều kiện còn nghèo khó.",
        },
      ],
    },
    {
      id: "m2s2",
      order: 2,
      title: "Ai nên đi học?",
      thesis: "Giáo dục mở ra cơ hội cho mọi người: trẻ em, phụ nữ và người nghèo cần được ưu tiên.",
      context:
        "Lớp học vận hành được vài tháng nhưng có gia đình rút con gái về làm việc nhà; vài người nghèo ngại không dám đi học vì sợ tốn giấy bút và thua kém người khác.",
      prompt: "Anh xử lý thế nào để việc học đến được với mọi người?",
      choices: [
        {
          label: "Để mỗi nhà tự quyết; học hay không là việc riêng, không xen vào.",
          hint: "Bỏ mặc những gia đình rút con khỏi lớp và người nghèo chưa dám học.",
          deltas: { daoduc: -3, trithuc: -4, daichung: -4 },
          explanation:
            "Bỏ mặc khiến khoảng cách dân trí ngày càng rộng. Văn hóa phục vụ nhân dân đòi hỏi chủ động đưa tri thức đến với mọi người, nhất là những người khó khăn, chứ không thờ ơ chờ họ tự tìm đến.",
        },
        {
          label: "Vận động riêng từng gia đình, hỗ trợ giấy bút cho nhà nghèo, mở lớp thuận tiện cho chị em.",
          hint: "Trực tiếp gỡ rào cản để phụ nữ và người nghèo được học.",
          correct: true,
          deltas: { trithuc: 5, daichung: 3, daoduc: 2, doanket: 3 },
          explanation:
            "Tính đại chúng đòi hỏi văn hóa đến với trẻ em, phụ nữ, người nghèo và người lao động. Hồ Chí Minh coi phụ nữ là một nửa nhân loại, cần được bình đẳng trong học tập và tham gia đời sống xã hội.",
          depth:
            "Giáo dục của chế độ mới hướng tới mọi người, nhất là trẻ em, phụ nữ và người nghèo - những người xưa nay ít được đến trường. Hồ Chí Minh nhấn mạnh phụ nữ là lực lượng quan trọng của cách mạng, nên giải phóng xã hội phải đi liền với việc phụ nữ được học tập và tham gia công việc chung. Gỡ rào cản cụ thể (cấp giấy bút cho nhà nghèo, giờ học thuận tiện cho chị em) chính là làm đúng tinh thần đại chúng hóa giáo dục: tri thức phải tự do đến với mọi nhà, không chờ mọi người tự tìm đến.",
        },
        {
          label: "Cấm nghỉ học; gia đình nào không cho con đi học sẽ bị nêu tên giữa chợ.",
          hint: "Dùng biện pháp cưỡng ép, xấu hổ thay cho thuyết phục.",
          deltas: { doanket: -5, trithuc: -3, dantoc: -2 },
          explanation:
            "Xây dựng đời sống mới dựa trên vận động, tự giác chứ không phải nêu tên, trừng phạt. Hồ Chí Minh chủ trương dân biết, dân bàn, dân làm; cưỡng ép làm mất lòng tin và sự đoàn kết trong làng.",
        },
        {
          label: "Họp dân nêu lợi ích của biết chữ, để chính các gia đình bàn bạc và cam kết đưa con đi học.",
          hint: "Lấy sự tự giác và dân chủ làm sức mạnh cho phong trào học.",
          deltas: { doanket: 6, daichung: 5, trithuc: 4 },
          explanation:
            "Dân là chủ, dân làm chủ: khi người dân hiểu lợi ích và tự cam kết thì phong trào bền vững. Hồ Chí Minh lấy nhân dân làm gốc, biến chủ trương thành việc tự giác của chính nhân dân.",
        },
      ],
    },
    {
      id: "m2s3",
      order: 3,
      title: "Khi lớp học gặp khó khăn",
      thesis: "“Vì lợi ích trăm năm thì phải trồng người”; việc học không được dừng vì khó khăn trước mắt.",
      context:
        "Mùa mưa đến, lớp học lụp xụp, thiếu đèn dầu, người dạy kiêm nhiệm sắp bận việc đồng. Có người đề nghị tạm đóng lớp tới mùa sau cho đỡ vất vả.",
      prompt: "Anh ứng phó thế nào để lớp học không bị gián đoạn?",
      choices: [
        {
          label: "Tạm đóng cửa lớp đến hết mùa mưa, chừng nào thuận tiện mở lại.",
          hint: "Dừng việc học vì những khó khăn tạm thời.",
          deltas: { trithuc: -5, khoahoc: -3, phucloi: -2 },
          explanation:
            "Gián đoạn việc học khiến công sức bình dân học vụ bị mai một. Hồ Chí Minh coi giáo dục là việc lâu dài, “trồng người” phải kiên trì, không thể gác lại mỗi khi gặp khó khăn.",
        },
        {
          label: "Cả thanh niên ra sửa lại lớp, góp chung đèn dầu, xếp lịch dạy luân phiên để lớp không ngừng.",
          hint: "Dựa vào sức dân, góp công góp của để giữ lớp học.",
          deltas: { doanket: 6, trithuc: 5, kinhte: 3 },
          explanation:
            "Khó khăn được hóa giải bằng tinh thần đoàn kết, tương thân tương ái. Hồ Chí Minh nhấn mạnh sức mạnh của tập thể và sự đùm bọc trong cộng đồng - nền tảng của xã hội mới.",
        },
        {
          label: "Chỉ cần một người kiên trì bám lớp; còn lại không cần góp sức.",
          hint: "Đẩy gánh nặng học tập lên một cá nhân.",
          deltas: { trithuc: -2, doanket: -3, kinhte: -2 },
          explanation:
            "Gánh nặng dồn vào một người khiến phong trào dễ đổ vỡ. Xây dựng nền văn hóa mới và nâng cao dân trí là việc của cả cộng đồng, không thể trông chờ một cá nhân.",
        },
        {
          label: "Nhờ các gia đình luân phiên cho lớp mượn nhà, kết hợp dạy tối, phụ nữ và thanh niên phụ trách từng khu.",
          hint: "Đưa lớp học về gần dân để giảm khó khăn đường sá, vật chất.",
          correct: true,
          deltas: { khoahoc: 5, trithuc: 4, daoduc: 3, kinhte: 2 },
          explanation:
            "Tạo điều kiện thiết thực cho người học, đặc biệt người lao động và vùng khó khăn, là biểu hiện của tính đại chúng. Văn hóa phục vụ nhân dân phải được tổ chức theo điều kiện thực tế của nhân dân.",
          depth:
            "“Vì lợi ích trăm năm phải trồng người” - Hồ Chí Minh căn dặn như vậy để thấy giáo dục là việc dài hơi, không được gián đoạn vì khó khăn nhất thời. Bài học của phong trào bình dân học vụ là dựa vào chính nhân dân: mượn nhà làm lớp, phân công phụ nữ và thanh niên phụ trách từng khu, biến mỗi gia đình thành một bộ phận của trường học. Đưa lớp về gần dân vừa giữ được việc học vừa vun đắp tinh thần tương thân tương ái giữa các nhà.",
        },
      ],
    },
  ],
  m3: [
    {
      id: "m3s1",
      order: 1,
      title: "Lễ hội mùa xuân",
      thesis: "Giữ gìn truyền thống tốt đẹp, cải biến hoặc loại bỏ yếu tố lạc hậu, cho dân cùng tham gia.",
      context:
        "Lễ hội làng có từ lâu đời nhưng năm nay thiếu kinh phí; một số nghi thức cúng bái tốn kém, chỉ vài nhà khá giả đứng ra trông coi, phần đông bà con đứng ngoài xem.",
      prompt: "Anh quyết định tổ chức lễ hội năm nay thế nào?",
      choices: [
        {
          label: "Bỏ hẳn lễ hội để dồn tiền làm đường sá, phát triển kinh tế.",
          hint: "Xóa bỏ hoàn toàn sinh hoạt văn hóa cộng đồng.",
          deltas: { dantoc: -6, doanket: -4, kinhte: 3 },
          explanation:
            "Văn hóa vừa là mục tiêu vừa là động lực, không phải gánh nặng bỏ được. Xóa bỏ lễ hội làm mất chỗ gắn kết cộng đồng và bản sắc, kinh tế có phát triển cũng thiếu nền tảng tinh thần.",
        },
        {
          label: "Giữ nguyên toàn bộ nghi thức như xưa, các nhà giàu trong làng lo phần cúng lễ.",
          hint: "Bảo tồn máy móc, giữ luôn phần mê tín và tốn kém.",
          deltas: { dantoc: 4, khoahoc: -4, daichung: -4 },
          explanation:
            "Giữ gìn bản sắc không có nghĩa giữ nguyên mọi phong tục. Theo Hồ Chí Minh phải bảo tồn giá trị tốt đẹp đồng thời cải biến, loại bỏ yếu tố lạc hậu; nếu không sẽ dẫn tới bảo thủ.",
        },
        {
          label: "Giữ phần nghi lễ tiêu biểu, bỏ những hình thức mê tín tốn kém, tổ chức gọn nhẹ để cả làng cùng tham gia.",
          hint: "Cân bằng giữa bảo tồn tinh hoa và đổi mới khoa học, tiết kiệm.",
          correct: true,
          deltas: { dantoc: 5, daichung: 2, doanket: 3 },
          explanation:
            "Đây là cách làm đúng tinh thần dân tộc – khoa học – đại chúng: giữ giá trị tốt đẹp, loại bỏ mê tín lãng phí và để nhân dân cùng tham gia. Văn hóa phải phục vụ quần chúng, không phải chỉ cho vài nhà.",
          depth:
            "Đề cương văn hóa Việt Nam và tư tưởng của Hồ Chí Minh đều yêu cầu “dân tộc hóa”: văn hóa phải giữ bản sắc, nhưng giữ gìn không có nghĩa giữ nguyên. Bảo tồn nghi lễ tiêu biểu, bỏ hình thức mê tín tốn kém và để cả làng tham gia là cách chọn lọc có khoa học: cái đẹp, cái gắn kết cộng đồng được giữ, cái lãng phí, mê muội được bỏ. Lễ hội vì thế trở thành sinh hoạt của quần chúng chứ không phải việc riêng của vài nhà khá giả.",
        },
        {
          label: "Sao chép nguyên khuôn mẫu một lễ hội nước ngoài cho mới lạ, hút khách.",
          hint: "Đánh đổi bản sắc để lấy sự phô trương bên ngoài.",
          deltas: { dantoc: -5, trithuc: -2, daichung: 3 },
          explanation:
            "Học hỏi cái hay của nước ngoài là cần thiết nhưng không được đánh mất bản sắc dân tộc. Tính dân tộc đòi hỏi giữ gìn tiếng nói, truyền thống, bản sắc; vay mượn máy móc làm xa rời cội nguồn.",
        },
      ],
    },
    {
      id: "m3s2",
      order: 2,
      title: "Chuyện cưới hỏi",
      thesis: "Bài trừ phong tục tốn kém, lạc hậu, xây dựng nếp sống mới lành mạnh mà vẫn giữ tình cảm cộng đồng.",
      context:
        "Làng có tục cưới xin bày vẽ nhiều ngày, thách cưới cao khiến nhà nghèo khó lấy vợ, gả chồng. Người thì muốn giữ cho đúng tục, kẻ thì muốn bỏ hẳn.",
      prompt: "Anh hướng dẫn làng xử lý tập tục này thế nào?",
      choices: [
        {
          label: "Giữ nguyên tục thách cưới vì là việc của cha ông, không nên đổi.",
          hint: "Ôm trọn tập tục tốn kém đè nặng nhà nghèo.",
          deltas: { dantoc: 3, kinhte: -5, daichung: -4 },
          explanation:
            "Không phải mọi phong tục đều đáng giữ. Tập tục thách cưới cao gây hậu quả kinh tế cho nhà nghèo và đi ngược tinh thần xây dựng đời sống mới - văn hóa phải giúp phân biệt tốt đẹp với lạc hậu.",
          depth:
            "Có những tập tục được gọi là “chuyện cha ông” nhưng thực chất là gánh nặng đè lên nhà nghèo. Hồ Chí Minh từng chỉ rõ việc thách cưới, cúng bái tốn kém cần được bài trừ để nhân dân đỡ gánh, trong khi những giá trị khác như lễ nghĩa, tình cảm sum vầy vẫn nguyên giá trị. Giữ nguyên thói tốn kém vì ngại đổi thay là níu giữ cái vỏ mà đánh mất cái hồn của phong tục.",
        },
        {
          label: "Bỏ hẳn mọi nghi lễ cưới xin để tiết kiệm triệt để.",
          hint: "Xóa sạch phong tục, làm mất ý nghĩa sum vầy của đám cưới.",
          deltas: { dantoc: -4, doanket: -4, kinhte: 3 },
          explanation:
            "Cải cách không có nghĩa xóa bỏ máy móc. Những nghi lễ thắm tình làng nghĩa xóm đáng giữ; cần bỏ cái tốn kém, sai lệch chứ không phải xóa sạch bản sắc.",
        },
        {
          label: "Giữ các nghi lễ có ý nghĩa sum vầy, bỏ việc thách cưới, hai gia đình trao đổi gọn nhẹ.",
          hint: "Giữ nét đẹp, loại thói tốn kém mà không mất tình cảm.",
          correct: true,
          deltas: { dantoc: 3, kinhte: 5, doanket: 3 },
          explanation:
            "Bảo tồn giá trị tốt đẹp, cải biến yếu tố lạc hậu là nguyên tắc của tính dân tộc. Vừa giữ ý nghĩa nhân văn, vừa tiết kiệm cho nhân dân chính là làm đúng tinh thần đời sống mới.",
          depth:
            "Trong tác phẩm “Đời sống mới”, Hồ Chí Minh kêu gọi cải cách việc cưới, việc tang, lễ tết theo hướng lành mạnh, tiết kiệm và tôn trọng tình người. Tục thách cưới cao khiến nhà nghèo lấy vợ gả chồng khó khăn, vừa tốn kém vừa sinh ra sự so đo - đó là yếu tố lạc hậu cần bỏ. Giữ nghi lễ sum vầy, dẹp chuyện thách cưới vừa giữ được tình làng nghĩa xóm vừa tạo nếp sống mới phù hợp với điều kiện vật chất của người dân.",
        },
        {
          label: "Lập quỹ làng hỗ trợ nhà nghèo tổ chức đám cưới tiết kiệm, cả làng cùng vui.",
          hint: "Lấy tinh thần tương thân tương ái làm nền cho nếp sống mới.",
          deltas: { phucloi: 6, doanket: 5, kinhte: 3 },
          explanation:
            "Tinh thần tương thân tương ái là đạo đức của xã hội mới. Hồ Chí Minh đề cao đoàn kết, đùm bọc lẫn nhau trong nhân dân; hỗ trợ nhà nghèo vừa giữ phong tục vừa bảo đảm công bằng xã hội.",
        },
      ],
    },
    {
      id: "m3s3",
      order: 3,
      title: "Tiếng nói và chữ viết",
      thesis: "Giữ gìn tiếng Việt, lịch sử và truyền thống; ngôn ngữ là hồn cốt của dân tộc.",
      context:
        "Nhiều bạn trẻ chuộng nói tiếng lóng, xen tiếng nước ngoài vô tội vạ, chữ viết nguệch ngoạc. Trong khi đó một số người bảo thủ đòi cấm hẳn việc học tiếng nước ngoài để “giữ gìn thuần khiết”.",
      prompt: "Anh định hướng việc giữ gìn tiếng Việt thế nào?",
      choices: [
        {
          label: "Không can thiệp, để ngôn ngữ tự nhiên biến đổi theo thời đại.",
          hint: "Thờ ơ trước sự mai một của tiếng mẹ đẻ.",
          deltas: { khoahoc: -3, dantoc: -4 },
          explanation:
            "Thờ ơ khiến tiếng Việt bị lai tạp, mất dần sự trong sáng. Giữ gìn tiếng nói, chữ viết là nội dung cốt lõi của tính dân tộc; không phải chuyện để mặc tự nhiên.",
        },
        {
          label: "Ra nội quy phạt người dùng tiếng lóng, cấm từ ngoại lai trong giao tiếp ở làng.",
          hint: "Dùng biện pháp cấm đoán cứng nhắc, thiếu giáo dục.",
          deltas: { dantoc: 3, trithuc: -3, doanket: -3 },
          explanation:
            "Cấm đoán máy móc dễ phản tác dụng. Giữ gìn tiếng Việt cần bằng giáo dục, nêu gương, xây dựng ý thức chứ không phải cưỡng chế - đúng phương pháp vận động trong đời sống mới.",
        },
        {
          label: "Mở diễn đàn, thi viết chữ đẹp, dạy trẻ yêu tiếng mẹ đẻ qua ca dao, truyện cổ; đồng thời khuyến khích học ngoại ngữ có mục đích.",
          hint: "Vừa giữ gìn hồn tiếng Việt, vừa mở cửa tiếp thu tinh hoa.",
          correct: true,
          deltas: { dantoc: 4, daoduc: 4, doanket: 3, kinhte: 5 },
          explanation:
            "Giữ gìn tiếng Việt, lịch sử, truyền thống là biểu hiện của tính dân tộc; học ngoại ngữ có mục đích là biểu hiện của tính khoa học. Cân bằng cả hai giúp dân tộc vừa giữ cội nguồn vừa tiến bộ.",
          depth:
            "Hồ Chí Minh coi tiếng nói là thứ của cải vô cùng lâu đời và vô cùng quý báu của dân tộc, phải giữ gìn, đồng thời khuyến khích tiếp thu tinh hoa nhân loại. Giữ tiếng Việt không có nghĩa bài trừ tiếng nước ngoài; ngược lại, học ngoại ngữ có mục đích giúp mở mang tri thức. Vừa dạy trẻ yêu tiếng mẹ đẻ qua ca dao, truyện cổ, vừa khuyến khích học ngoại ngữ để hòa nhập là cách dung hòa dân tộc hóa với khoa học hóa - không khép kín cũng không hòa tan bản sắc.",
        },
        {
          label: "Tuyệt đối cấm tiếng nước ngoài trong làng để giữ gìn sự thuần khiết.",
          hint: "Bảo thủ, khép mình trước tinh hoa bên ngoài.",
          deltas: { dantoc: 3, khoahoc: -4, trithuc: -3 },
          explanation:
            "Giữ gìn bản sắc không có nghĩa khép kín. Tính khoa học đòi hỏi tiếp thu cái hay, cái tiến bộ của thế giới; bảo thủ khiến dân tộc tụt hậu, xa rời sự phát triển chung.",
          depth:
            "Cấm hẳn tiếng nước ngoài nghe giống “bảo vệ bản sắc” nhưng lại phản lại tinh thần khoa học trong tư tưởng của Hồ Chí Minh: Người đã đi nhiều nước và tiếp thu tinh hoa của nhân loại để phục vụ dân tộc, chứ không cô lập mình. Dân tộc hóa không có nghĩa khép kín; một dân tộc khép kín sẽ tụt hậu, và bản sắc cũng khó phát huy trong thế giới giao lưu. Bảo vệ tiếng Việt đúng cách là nâng cao sự trong sáng, tinh tế của nó chứ không phải dựng hàng rào cấm đoán.",
        },
      ],
    },
  ],
  m4: [
    {
      id: "m4s1",
      order: 1,
      title: "Tiếng đồn trong làng",
      thesis: "Chống mê tín, tin đồn và tư duy phản khoa học; lấy tri thức và bằng chứng làm lời giải đáp.",
      context:
        "Trong làng rộ lên tin đồn: đêm trăng tròn ra giếng làng sẽ gặp “ma”, nhà nào đang có người ốm mà ra giếng thì cả nhà nguy. Nhiều người hoảng sợ, không dám ra lấy nước, có nơi đắp bịt giếng lại.",
      prompt: "Anh xử lý tiếng đồn này thế nào?",
      choices: [
        {
          label: "Ra lệnh cấm người trong làng bàn chuyện ma quỷ, ai bàn sẽ bị nhắc nhở.",
          hint: "Đàn áp tin đồn mà không giải thích được sự thật.",
          deltas: { khoahoc: -3, doanket: -3, trithuc: -2 },
          explanation:
            "Cấm đoán không xóa được mê tín, chỉ đẩy nó chui vào bóng tối. Tính khoa học đòi hỏi dùng lời lẽ, bằng chứng thuyết phục chứ không phải lệnh cấm.",
        },
        {
          label: "Cùng đội y tế kiểm tra nguồn nước, giải thích cho dân, tăng cường đèn chiếu sáng khu giếng ban đêm.",
          hint: "Lấy kiểm tra thực tế và chiếu sáng để dẹp bóng ma trong lòng người.",
          correct: true,
          deltas: { khoahoc: 7, trithuc: 3, phucloi: 7 },
          explanation:
            "Dùng khoa học và bằng chứng để xóa tin đồn: nước được kiểm tra, ánh sáng xua tan bóng tối. Đây là biểu hiện trực tiếp của tính khoa học - chống mê tín bằng sự thật, không phải bằng cấm đoán.",
          depth:
            "Câu chuyện “ma giếng” là một hiện tượng tâm lý điển hình của làng quê xưa, và Hồ Chí Minh chủ trương bài trừ mê tín dị đoan bằng cách làm cho dân hiểu, dân tin rồi dân làm - tức dùng sự thật và kết quả cụ thể thuyết phục, không ra lệnh cấm. Kiểm tra nguồn nước bằng y tế và thắp sáng khu giếng ban đêm là đưa đến hai “liều thuốc”: bằng chứng khoa học phá bỏ ảo tưởng, và ánh sáng xua tan bóng tối khiến điều bí ẩn tự biến mất.",
        },
        {
          label: "Theo ý dân, che giếng lại, làm một bữa lễ cúng cho làng yên chuyện.",
          hint: "Nhượng bộ mê tín, chấp nhận cái sai để “cho xong”.",
          deltas: { khoahoc: -6, phucloi: -3, dantoc: -2 },
          explanation:
            "Nhượng bộ mê tín khiến đời sống tiếp tục bị lệ thuộc vào tin đồn, xa rời phương pháp khoa học. Hồ Chí Minh chủ trương bài trừ mê tín dị đoan, mê tín không mang lại nước sạch hay sức khỏe cho dân.",
          depth:
            "Nhượng bộ mê tín để “cho làng yên” thực chất càng củng cố niềm tin sai lệch: mai này gặp ốm đau, việc làm ăn, người ta lại tìm đến cúng bái thay vì khoa học. Cách xử lý của Hồ Chí Minh thì ngược lại: cán bộ phải kiên trì giải thích, nêu gương và đem lại lợi ích cụ thể để nhân dân tự rời bỏ mê tín. Nước sạch và sức khỏe chỉ đến từ y tế, vệ sinh chứ không phải từ lễ cúng.",
        },
        {
          label: "Phát tờ rơi chê bai, mỉa mai những nhà còn tin chuyện ma quỷ.",
          hint: "Giễu cợt người dân thay vì giúp họ hiểu đúng.",
          deltas: { doanket: -5, khoahoc: 3, daichung: -3 },
          explanation:
            "Gây sức ép bằng chê bai làm tổn thương lòng tự trọng, phá vỡ đoàn kết. Vận động quần chúng cần kiên trì, tôn trọng và giải thích rõ ràng, phù hợp với tính đại chúng của văn hóa.",
        },
      ],
    },
    {
      id: "m4s2",
      order: 2,
      title: "Chuyện chữa bệnh",
      thesis: "Y tế, vệ sinh và khoa học bảo vệ sức khỏe nhân dân; cúng bái không thay được thuốc men.",
      context:
        "Dịch sốt lan trong làng. Nhiều nhà chọn cách cúng bái, trì hoãn đưa người ốm tới trạm xá; có người mách nhau uống lá cây chữa “bách bệnh”.",
      prompt: "Anh làm gì để bảo vệ sức khỏe nhân dân?",
      choices: [
        {
          label: "Để mỗi nhà tự lo theo phong tục, khỏi gây mất lòng ai.",
          hint: "Bỏ mặc sức khỏe cộng đồng trong lúc dịch bệnh.",
          deltas: { phucloi: -6, khoahoc: -4, doanket: -3 },
          explanation:
            "Bỏ mặc khiến dịch lan rộng, người ốm chậm được chữa trị. Trách nhiệm bảo vệ sức khỏe nhân dân là việc chung của cộng đồng, không thể trông chờ vào cúng bái.",
        },
        {
          label: "Phối hợp trạm y tế khám, cách ly ca bệnh, họp dân giải thích đường lây để phòng tránh.",
          hint: "Dùng biện pháp y tế và tuyên truyền bằng bằng chứng.",
          correct: true,
          deltas: { khoahoc: 6, phucloi: 8, daichung: 6, daoduc: 3 },
          explanation:
            "Phòng chống dịch bằng khoa học: khám, cách ly, giải thích đường lây. Đây là áp dụng tri thức và phương pháp tiến bộ vào đời sống - cốt lõi của tính khoa học nhằm bảo vệ sức khỏe và phúc lợi nhân dân.",
          depth:
            "Trong xây dựng đời sống mới, Hồ Chí Minh nhiều lần nhắc tới vệ sinh, phòng bệnh như một hoạt động văn hóa quan trọng của cộng đồng. Phòng sốt bằng khám, cách ly và tuyên truyền đường lây đúng phương pháp y tế là cách khoa học che chở cho phúc lợi nhân dân. Điều đáng chú ý còn ở cách làm: dân được giải thích cặn kẽ để tự hiểu, tự phòng tránh - vừa khoa học vừa đại chúng.",
        },
        {
          label: "Cưỡng bức mọi phải tiêm thuốc do cán bộ chỉ định, ai không nghe thì phạt.",
          hint: "Xử lý phản giáo dục, thiếu thuyết phục dân.",
          deltas: { doanket: -4, daichung: -2, phucloi: 3 },
          explanation:
            "Dù bảo vệ sức khỏe nhưng cưỡng chế, phạt vạ đi ngược phương pháp dân vận. Hồ Chí Minh căn dặn phải giải thích cho dân hiểu, dân tin rồi dân làm, chứ không ép buộc.",
          depth:
            "Dù động cơ là bảo vệ sức khỏe, ép buộc và phạt vạ vẫn đi ngược phương pháp dân vận mà Hồ Chí Minh hằng nhắc: phải giải thích cho dân hiểu, dân tin, dân theo, rồi dân làm. Cưỡng bức biến việc tốt thành gánh nặng, nhân dân mất lòng tin vào chính quyền và phong trào dễ tan khi áp lực dừng lại. Muốn bảo vệ sức khỏe lâu dài, trước hết phải giành được lòng dân.",
        },
        {
          label: "Phát tờ rơi mỉa mai những nhà còn cúng bái lúc dịch bệnh.",
          hint: "Biến việc vận động thành sự chỉ trích, gây chia rẽ.",
          deltas: { khoahoc: 3, doanket: -5, daichung: -3 },
          explanation:
            "Chê bai, mỉa mai làm giảm lòng tin và chia rẽ làng xóm. Vận động quần chúng phải tôn trọng, kiên trì, vừa tuyên truyền vừa giúp đỡ cụ thể - đúng tinh thần đại chúng.",
        },
      ],
    },
    {
      id: "m4s3",
      order: 3,
      title: "Làm ruộng theo cách mới",
      thesis: "Học đi đôi với hành, lý luận gắn liền thực tế; khoa học kỹ thuật nâng cao đời sống sản xuất.",
      context:
        "Cán bộ nông vụ về hướng dẫn làm thử giống lúa mới và cách ủ phân. Nhiều người chê: “Cha ông làm thế nào thì làm thế ấy cho chắc, đừng phá của.”",
      prompt: "Anh vận động bà con ứng dụng kỹ thuật mới thế nào?",
      choices: [
        {
          label: "Cho làm thí điểm một thửa ruộng, ghi chép kết quả so với ruộng làm cũ rồi đưa số liệu ra bàn với dân.",
          hint: "Lấy thực nghiệm và con số cụ thể để thuyết phục.",
          correct: true,
          deltas: { khoahoc: 7, trithuc: 4, kinhte: 8, daoduc: 2 },
          explanation:
            "Phương pháp khoa học: thí nghiệm, quan sát, so sánh bằng chứng. Hồ Chí Minh căn dặn học phải đi đôi với hành, lý luận gắn liền thực tế - làm thử rồi lấy kết quả thực tế thuyết phục nhân dân.",
          depth:
            "Hồ Chí Minh căn dặn học phải đi đôi với hành, lý luận gắn liền với thực tế - và tinh thần đó áp dụng thẳng vào chuyện làm ruộng. Làm thí điểm một thửa ruộng, ghi chép so sánh năng suất rồi mời dân bàn bằng con số là đúng chu trình khoa học: quan sát, đo đếm, thử nghiệm trước khi thay đổi quy mô. Người nông dân chỉ tin điều mình tận mắt thấy, nên kết quả thực tế là lời thuyết phục mạnh nhất, hơn mọi lời hô hào.",
        },
        {
          label: "Ép cả làng làm ngay theo cách mới, ai không làm thì không được dự họp.",
          hint: "Cưỡng bức thay đổi phương thức sản xuất của dân.",
          deltas: { kinhte: 4, doanket: -4, khoahoc: 2 },
          explanation:
            "Ép buộc khiến dân mất quyền làm chủ, dễ phá sản khi gặp rủi ro. Dân phải được bàn bạc, tự nguyện tham gia, đó mới là phong trào bền vững theo tư tưởng dân là chủ.",
        },
        {
          label: "Giữ nguyên cách làm cũ cho chắc ăn, không thử nghiệm gì.",
          hint: "Từ chối đổi mới, bỏ qua cơ hội tăng năng suất.",
          deltas: { kinhte: -4, khoahoc: -3, trithuc: -3 },
          explanation:
            "Bảo thủ với cách làm cũ khiến năng suất trì trệ. Tính khoa học yêu cầu không ngừng học hỏi, ứng dụng tiến bộ kỹ thuật để nâng cao đời sống nhân dân; giữ nguyên không phải cách xây dựng kinh tế mới.",
        },
        {
          label: "Mời những hộ tiên phong làm thử, làng hỗ trợ giống; khi đạt thì tổ chức cho cả làng tham quan ruộng thực tế.",
          hint: "Vừa tiến hành thực nghiệm vừa động viên nhân dân học hỏi.",
          deltas: { doanket: 5, trithuc: 5, kinhte: 4 },
          explanation:
            "Lấy việc làm thực tế làm lời thuyết phục, lấy những hộ tiên phong làm gương. Cách này vừa tôn trọng sự tự nguyện của dân vừa phổ biến tri thức khoa học - kết hợp tính khoa học với tính đại chúng.",
        },
      ],
    },
  ],
  m5: [
    {
      id: "m5s1",
      order: 1,
      title: "Con em vùng xa",
      thesis: "Văn hóa thuộc về nhân dân; mọi trẻ em, kể cả vùng khó khăn, phải có cơ hội học tập.",
      context:
        "Xóm trên núi cách làng chính hai giờ đi bộ; con em ở đó gần như không được học, cha mẹ lại ít thấy việc học có ích gì cho ruộng vườn.",
      prompt: "Anh làm gì để con em vùng xa được học?",
      choices: [
        {
          label: "Việc học tùy điều kiện từng nhà; làng không thể lo cho cả xóm xa.",
          hint: "Bỏ mặc một bộ phận nhân dân ở vùng khó khăn.",
          deltas: { daichung: -7, trithuc: -4, phucloi: -3 },
          explanation:
            "Văn hóa phải đến với mọi người, nhất là vùng khó khăn. Từ chối chăm lo cho xóm xa là đi ngược tính đại chúng - văn hóa không thuộc riêng ai, không dừng ở làng chính.",
        },
        {
          label: "Vận động các gia đình gửi con xuống làng chính ở trọ để học.",
          hint: "Chuyển gánh nặng sang các gia đình vùng xa.",
          deltas: { trithuc: 4, kinhte: -4 },
          explanation:
            "Đòi hỏi gia đình nghèo ở trọ làm tăng gánh nặng kinh tế, dễ khiến trẻ bỏ học. Văn hóa phục vụ nhân dân phải đặt lợi ích và điều kiện của nhân dân làm trung tâm.",
        },
        {
          label: "Mở lớp bản nhỏ do người biết chữ tại chỗ phụ trách, giáo viên làng luân phiên lên dạy, cấp sách vở cho học trò.",
          hint: "Đưa trường học đến tận bản, dựa vào lực lượng tại chỗ.",
          correct: true,
          deltas: { dantoc: 2, daichung: 6, trithuc: 5, phucloi: 7 },
          explanation:
            "Mang việc học đến tận dân, dựa vào dân là phương châm của nền giáo dục mới. Tính đại chúng đòi hỏi tạo cơ hội tiếp cận giáo dục cho mọi trẻ em vùng xa, người nghèo.",
          depth:
            "Văn hóa phải thuộc về toàn dân, người vùng sâu, vùng xa cũng như người ở làng chính. Phong trào bình dân học vụ trước đây làm được điều này bằng cách đưa lớp học đến tận làng và dựa vào người biết chữ tại chỗ, vì chờ trường chính quy tới vùng xa thì sẽ phải đợi rất lâu. Mở lớp bản nhỏ, giáo viên luân phiên lên dạy, cấp sách vở cho học trò vừa tôn trọng điều kiện của người nghèo vừa khẳng định tiến bộ phải đến với miền xuôi lẫn miền ngược như nhau.",
        },
        {
          label: "Xin huyện hỗ trợ một phòng học bán trú và giáo viên cắm bản.",
          hint: "Kết hợp nguồn lực bên ngoài để phục vụ vùng khó khăn.",
          deltas: { phucloi: 6, trithuc: 5, kinhte: 3 },
          explanation:
            "Huy động nguồn lực để xây dựng phúc lợi cho dân là biểu hiện của xã hội hướng tới phúc lợi nhân dân. Văn hóa cho mọi người cần sự hỗ trợ kịp thời từ nơi có điều kiện hơn.",
        },
      ],
    },
    {
      id: "m5s2",
      order: 2,
      title: "Chị em phụ nữ",
      thesis: "Văn hóa dành cho mọi người; phụ nữ có quyền học tập và tham gia công việc xã hội như nam giới.",
      context:
        "Chị em suốt ngày lo cơm nước, con cái, ít người được học; các buổi họp bàn việc làng chủ yếu do nam giới tham gia.",
      prompt: "Anh đưa việc học tập và sinh hoạt văn hóa tới chị em thế nào?",
      choices: [
        {
          label: "Chị em bận việc nhà; góp ý qua chồng con của họ là được.",
          hint: "Gạt phụ nữ ra ngoài đời sống văn hóa – xã hội.",
          deltas: { daichung: -7, daoduc: -4, trithuc: -2 },
          explanation:
            "Văn hóa thuộc về nhân dân, phụ nữ là một nửa nhân dân. Gạt chị em ra ngoài khiến họ không được học, không được tham gia bàn việc chung - đi ngược quyền bình đẳng trong xã hội mới.",
          depth:
            "Nói “chị em bận việc nhà” thực chất là thói quen xem phụ nữ chỉ thuộc về bếp núc, con cái - một quan niệm lạc hậu mà nền văn hóa mới phải thay đổi. Hồ Chí Minh xem phụ nữ là lực lượng quan trọng của cách mạng, phải được học tập và tham gia công việc xã hội như nam giới. Gạt họ ra khỏi các buổi bàn việc làng là tự triệt tiêu một nửa sức mạnh của cộng đồng; giải phóng phụ nữ chính là giải phóng xã hội.",
        },
        {
          label: "Mở lớp tối cho chị em, xếp thời gian học ngắn gọn, giao hội phụ nữ quản lý, mời đại diện chị em dự họp làng.",
          hint: "Tạo điều kiện học tập và tiếng nói cho chị em.",
          correct: true,
          deltas: { daichung: 6, trithuc: 5, doanket: 4 },
          explanation:
            "Tính đại chúng đòi hỏi văn hóa đến với phụ nữ và mọi tầng lớp. Hồ Chí Minh coi giải phóng phụ nữ là một nội dung lớn; cho chị em học và tham gia công việc xã hội là phát huy sức mạnh toàn dân.",
          depth:
            "Hồ Chí Minh rất trân trọng vai trò của phụ nữ: Người nhấn mạnh phụ nữ là lực lượng quan trọng của cách mạng, giải phóng phụ nữ gắn liền với giải phóng dân tộc và giai cấp. Trong xã hội cũ, những chuẩn mực cổ hủ đã tước đi quyền học tập và tiếng nói của chị em; xây dựng nền văn hóa mới phải phá bỏ rào cản đó. Lớp tối cho chị em, giao hội phụ nữ tự quản lý và mời đại diện chị em dự họp làng là cách làm cho văn hóa thực sự thuộc về toàn dân.",
        },
        {
          label: "Chỉ nên dạy chị em nội trợ, khâu vá; chữ nghĩa nhiều không cần thiết.",
          hint: "Thu hẹp cơ hội học tập của phụ nữ vào việc bếp núc.",
          deltas: { khoahoc: -4, trithuc: -5, daichung: -3 },
          explanation:
            "Thu hẹp việc học của phụ nữ là quan niệm lạc hậu. Con người mới phải có tri thức toàn diện; phụ nữ cũng cần chữ nghĩa, khoa học để làm chủ đời sống và đóng góp cho cộng đồng.",
        },
        {
          label: "Giao toàn bộ việc mở lớp cho hội phụ nữ tự lo, làng không tham gia.",
          hint: "Đẩy trách nhiệm về một phía, thiếu sự chung tay của cả làng.",
          deltas: { trithuc: 3, doanket: -3, kinhte: -2 },
          explanation:
            "Xây dựng văn hóa là việc của cả cộng đồng chứ không phải của riêng hội phụ nữ. Thiếu sự phối hợp làm phong trào học khó bền vững và nguồn lực dễ thiếu hụt.",
        },
      ],
    },
    {
      id: "m5s3",
      order: 3,
      title: "Người lao động không có thời gian",
      thesis: "Văn hóa phục vụ nhân dân lao động; phải sắp xếp điều kiện để người lao động được tiếp cận tri thức.",
      context:
        "Thợ thủ công và người làm mướn làm việc từ sáng đến tối, không tới được lớp buổi tối cuối làng. Họ than: “Mệt lắm, không còn sức học.”",
      prompt: "Anh tạo điều kiện gì để người lao động được học?",
      choices: [
        {
          label: "Họ phải tự thu xếp; văn hóa không dành cho người mệt mỏi.",
          hint: "Loại người lao động ra khỏi đời sống văn hóa.",
          deltas: { daichung: -7, phucloi: -4, daoduc: -3 },
          explanation:
            "Văn hóa phục vụ nhân dân lao động, không phải chỉ dành cho người rảnh rỗi. Bỏ mặc người lao động là đi ngược bản chất đại chúng và mất động lực của nhân dân trong xây dựng văn hóa.",
        },
        {
          label: "Mở lớp ngay nơi làm việc trong giờ giải lao, tóm tắt bài, phát tài liệu để học lúc nông nhàn.",
          hint: "Đưa việc học đến tận chỗ lao động cho phù hợp thời gian.",
          correct: true,
          deltas: { dantoc: 2, daichung: 5, trithuc: 5, phucloi: 7 },
          explanation:
            "Văn hóa phải được tổ chức theo điều kiện của quần chúng lao động. Hồ Chí Minh chủ trương mọi hình thức học linh hoạt để “mọi người dân được học” - học mọi lúc, mọi nơi.",
          depth:
            "Văn hóa vì nhân dân lao động phải được tổ chức theo nhịp sống của họ, không bắt họ hy sinh lúc đang làm việc. Hồ Chí Minh chủ trương mọi người đều được học, học mọi lúc, mọi nơi, bằng nhiều hình thức linh hoạt: học ngay tại nơi làm việc trong giờ giải lao, nghe tóm tắt bài, đọc tài liệu lúc nông nhàn. Đưa lớp đến tận chỗ lao động vừa nâng dân trí vừa tôn trọng sức người thợ - một cách làm vừa thực tế vừa nhân văn.",
        },
        {
          label: "Giảm giờ làm cho cả làng để ai cũng có thời gian đến lớp.",
          hint: "Áp dụng máy móc gây tổn hại cho sản xuất.",
          deltas: { kinhte: -4, trithuc: 4 },
          explanation:
            "Giảm giờ làm đồng loạt gây thiệt hại kinh tế của làng. Học đi đôi với hành: việc học phải khéo bố trí để không cản trở công việc, chứ không hi sinh sản xuất một cách máy móc.",
        },
        {
          label: "Thuê người chép bài dán ở chợ để người lao động đọc lúc rảnh.",
          hint: "Hình thức học thụ động, thiếu sự hướng dẫn trực tiếp.",
          deltas: { trithuc: 3, daichung: 3 },
          explanation:
            "Phương tiện bổ trợ có ích nhưng không thay được lớp học có người hướng dẫn. Văn hóa phục vụ nhân dân cần sự đồng hành trực tiếp, giúp người lao động hiểu và vận dụng được tri thức.",
        },
      ],
    },
  ],
  m6: [
    {
      id: "m6s1",
      order: 1,
      title: "Kế hoạch năm tới",
      thesis: "Xây dựng nền văn hóa mới phải đồng bộ tâm lý, luân lý, xã hội, chính trị và kinh tế, không thiên về một mặt.",
      context:
        "Đầu năm, Ủy ban họp bàn kế hoạch. Có ý kiến muốn dồn toàn lực cho kinh tế, hoãn hết việc văn hóa; có ý kiến muốn chỉ lo sinh hoạt văn hóa, tạm gác sản xuất.",
      prompt: "Anh định hướng kế hoạch năm tới thế nào?",
      choices: [
        {
          label: "Dồn toàn lực làm kinh tế năm nay, mọi hoạt động văn hóa để năm sau.",
          hint: "Chỉ chú trọng một mặt, đặt kinh tế tách rời văn hóa.",
          deltas: { kinhte: 7, khoahoc: -4, daichung: -5 },
          explanation:
            "Văn hóa gắn bó với chính trị và kinh tế, tác động qua lại. Dồn hết cho kinh tế mà bỏ văn hóa khiến đời sống tinh thần trống rỗng, quần chúng mất động lực - không thể xây dựng cộng đồng toàn diện.",
        },
        {
          label: "Làm văn hóa suốt năm, tổ chức nhiều hoạt động biểu diễn, tạm hoãn cải tiến sản xuất.",
          hint: "Chỉ lo bề nổi văn hóa, bỏ mặc kinh tế và đời sống vật chất.",
          deltas: { dantoc: 5, trithuc: -3, kinhte: -4 },
          explanation:
            "Kinh tế là nền tảng cho đời sống xã hội. Xây dựng văn hóa mà bỏ bê sản xuất làm thiếu nền tảng vật chất; văn hóa phải cùng phát triển với kinh tế, không tách rời.",
        },
        {
          label: "Chia cân đối: cải tiến sản xuất, nâng vệ sinh – sức khỏe, tiếp tục lớp học, giữ sinh hoạt làng và phát huy dân chủ trong họp bàn.",
          hint: "Bao quát đủ năm lĩnh vực tâm lý, luân lý, xã hội, chính trị, kinh tế.",
          correct: true,
          deltas: { khoahoc: 5, kinhte: 4, daichung: 4, doanket: 2 },
          explanation:
            "Đúng năm điểm lớn xây dựng nền văn hóa dân tộc: tâm lý, luân lý, xã hội, chính trị, kinh tế phải phát triển đồng bộ. Một cộng đồng vững mạnh khi mọi mặt đời sống được chăm lo cân bằng.",
          depth:
            "Năm điểm lớn xây dựng nền văn hóa dân tộc của Hồ Chí Minh gồm tâm lý, luân lý, xã hội, chính trị và kinh tế - có nghĩa văn hóa không chỉ là đời sống tinh thần mà là cách tổ chức toàn bộ đời sống. Kế hoạch vừa cải tiến sản xuất, vừa lo vệ sinh – sức khỏe, lớp học, sinh hoạt làng và dân chủ trong họp bàn đã bao quát đủ năm mặt ấy. Các mặt tác động qua lại: kinh tế làm nền tảng, tri thức và đạo đức định hướng, đoàn kết giữ cho mọi việc bền vững.",
        },
        {
          label: "Xin huyện quyết định toàn bộ kế hoạch để khỏi tranh cãi trong làng.",
          hint: "Phủ nhận quyền tự chủ, tự quản của nhân dân.",
          deltas: { doanket: -3, daichung: -3, kinhte: 2 },
          explanation:
            "Dân là chủ, dân làm chủ. Phó mặc kế hoạch cho cấp trên làm mất quyền bàn bạc, quyết định của nhân dân, đi ngược nguyên tắc đại chúng trong xây dựng nền văn hóa mới.",
        },
      ],
    },
    {
      id: "m6s2",
      order: 2,
      title: "Nóng giận trong buổi họp làng",
      thesis: "Xây dựng xã hội hướng tới phúc lợi nhân dân; dân chủ đi đôi với trách nhiệm và giữ gìn đoàn kết.",
      context:
        "Buổi họp tổng kết giữa năm, một nhóm chê chính quyền làm chậm chuyện y tế, nhóm kia trách nhóm trước chỉ biết nói mà không góp sức. Cuộc họp sắp nổ ra to tiếng.",
      prompt: "Anh xử lý buổi họp thế nào để giữ dân chủ mà không mất đoàn kết?",
      choices: [
        {
          label: "Ra lệnh trật tự, bác hết ý kiến trái chiều cho nhanh.",
          hint: "Đè nén ý kiến nhân dân để họp cho xuôi.",
          deltas: { doanket: -5, daichung: -5, daoduc: -3 },
          explanation:
            "Bác bỏ ý kiến trái chiều là tước quyền dân chủ của nhân dân. Hồ Chí Minh nhấn mạnh phải thật thà lắng nghe dân, sửa đổi theo ý dân; đè nén chỉ làm mất lòng tin.",
        },
        {
          label: "Xác nhận việc đã làm và việc còn thiếu, mời các nhóm nêu giải pháp, phân công người phụ trách cụ thể, hẹn kiểm điểm lại.",
          hint: "Biến bất đồng thành việc chung, phân công trách nhiệm rõ ràng.",
          correct: true,
          deltas: { dantoc: 3, doanket: 6, daichung: 4, daoduc: 4 },
          explanation:
            "Dân chủ phải đi đôi với trách nhiệm và đoàn kết. Biến góp ý thành giải pháp, phân công cụ thể là cách xây dựng xã hội có kỷ luật, ý thức - đúng tinh thần xây dựng con người mới.",
          depth:
            "Dân chủ theo Hồ Chí Minh gắn liền với trách nhiệm và kỷ luật: dân được bàn, được quyết định, nhưng ai nhận làm phải làm cho tới nơi tới chốn. Xác nhận việc đã làm và việc còn thiếu, mời các nhóm nêu giải pháp, phân công người phụ trách và hẹn kiểm điểm lại là thực hành đúng quy trình đó: lắng nghe, biến bất đồng thành việc chung, rồi đưa vào giám sát tập thể. Họp không chỉ để phát biểu mà để giao trách nhiệm cụ thể.",
        },
        {
          label: "Đồng tình hoàn toàn với nhóm chê trách để lấy lòng số đông.",
          hint: "Xu nịnh, thả nổi theo đám đông, thiếu căn cứ.",
          deltas: { daoduc: -4, doanket: 3, kinhte: -2 },
          explanation:
            "Thấy đúng mới đồng tình, không phải gật theo số đông. Đạo đức của cán bộ là trung thực, dám nói đúng, dám chịu trách nhiệm vì lợi ích nhân dân, không xu nịnh.",
        },
        {
          label: "Hoãn họp vô thời hạn, chờ khi nào bình yên rồi họp lại.",
          hint: "Trì hoãn, né tránh việc chung của làng.",
          deltas: { doanket: -3, phucloi: -2, trithuc: -2 },
          explanation:
            "Né tránh việc chung khiến vấn đề phúc lợi, y tế của dân bị đình trệ. Người phụ trách phải kịp thời xử lý công việc vì lợi ích nhân dân, không vì ngại va chạm mà trì hoãn.",
        },
      ],
    },
    {
      id: "m6s3",
      order: 3,
      title: "Tổng kết cuối năm",
      thesis: "Đánh giá toàn diện mọi mặt để con người phát triển hài hòa: tri thức, đạo đức, bản sắc, phúc lợi và kinh tế.",
      context:
        "Cuối năm nhìn lại: đường sá khá hơn, thu nhập dịp vụ tăng; nhưng vài xóm xa vẫn vắng lớp học, đình làng xuống cấp, người già ít nơi sinh hoạt.",
      prompt: "Anh đánh giá và định hướng cuối năm như thế nào?",
      choices: [
        {
          label: "Khen hết về kinh tế vì có của ăn của để là điều quan trọng nhất.",
          hint: "Chỉ nhìn thấy một mặt, bỏ qua văn hóa và phúc lợi.",
          deltas: { kinhte: 5, daichung: -4, daoduc: -2 },
          explanation:
            "Kinh tế quan trọng nhưng không phải là tất cả. Đánh giá phiến diện khiến cộng đồng lơ là văn hóa, phúc lợi - vi phạm yêu cầu xây dựng đồng bộ các mặt của một nền văn hóa mới.",
        },
        {
          label: "Chỉ nêu thiếu sót, không công nhận tiến bộ để mọi người khỏi tự mãn.",
          hint: "Phủ nhận nỗ lực, làm mất động lực của nhân dân.",
          deltas: { doanket: -4, kinhte: -2, daoduc: -2 },
          explanation:
            "Xây dựng xã hội mới phải động viên, khích lệ đúng mực. Chỉ chê hoặc chỉ khen đều sai phương pháp dân vận - cần nhìn nhận trung thực cả tiến bộ lẫn tồn tại.",
        },
        {
          label: "Nhìn nhận cả tiến bộ lẫn thiếu sót từng mặt, lập kế hoạch khắc phục, mời cả làng góp công góp ý.",
          hint: "Đánh giá toàn diện, biến tổng kết thành động lực mới.",
          correct: true,
          deltas: { dantoc: 7, khoahoc: 8, daichung: 3, daoduc: 4, phucloi: 8, kinhte: 5 },
          explanation:
            "Tổng kết trung thực mọi mặt và lấy ý dân làm gốc là cách xây dựng con người mới hài hòa: có tri thức, đạo đức, yêu nước, ý thức kỷ luật và tôn trọng lợi ích cộng đồng.",
          depth:
            "Con người mới mà Hồ Chí Minh muốn xây dựng có tri thức, đạo đức, bản sắc, ý thức kỷ luật và tôn trọng lợi ích cộng đồng, nên tổng kết đầu năm, cuối năm phải nhìn toàn diện chứ không chỉ khoe con số kinh tế. Nhìn nhận trung thực cả tiến bộ lẫn thiếu sót của từng mặt rồi mời cả làng góp ý, góp công là cách phát huy quyền làm chủ của nhân dân và giữ phong trào không tự mãn. Chính phương châm “dân bàn, dân làm, dân kiểm tra” làm nên sức bền của nền văn hóa mới.",
        },
        {
          label: "Giao ban cán bộ tự đánh giá và quyết kế hoạch, khỏi họp dân mất thời gian.",
          hint: "Khép kín quyết định, xa rời nhân dân.",
          deltas: { daichung: -6, trithuc: -3, kinhte: 3 },
          explanation:
            "Nhân dân là gốc của mọi công việc. Quyết định khép kín, không nghe dân khiến kế hoạch xa rời thực tế và mất tính đại chúng. Việc chung phải để dân bàn, dân kiểm tra.",
        },
      ],
    },
  ],
};

export function scenariosForLevel(levelId) {
  return SCENARIOS[levelId] || [];
}

export function statKeys() {
  return [...STAT_KEYS];
}