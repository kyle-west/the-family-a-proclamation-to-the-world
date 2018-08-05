const paragraphs = [
  "WE, THE FIRST PRESIDENCY and the Council of the Twelve Apostles of The Church of Jesus Christ of Latter-day Saints, solemnly proclaim that marriage between a man and a woman is ordained of God and that the family is central to the Creator's plan for the eternal destiny of His children.", 
  "ALL HUMAN BEINGS - male and female - are created in the image of God. Each is a beloved spirit son or daughter of heavenly parents, and, as such, each has a divine nature and destiny. Gender is an essential characteristic of individual premortal, mortal, and eternal identity and purpose.", 
  "IN THE PREMORTAL REALM, spirit sons and daughters knew and worshipped God as their Eternal Father and accepted His plan by which His children could obtain a physical body and gain earthly experience to progress toward perfection and ultimately realize their divine destiny as heirs of eternal life. The divine plan of happiness enables family relationships to be perpetuated beyond the grave. Sacred ordinances and covenants available in holy temples make it possible for individuals to return to the presence of God and for families to be united eternally.", 
  "THE FIRST COMMANDMENT that God gave to Adam and Eve pertained to their potential for parenthood as husband and wife. We declare that God's commandment for His children to multiply and replenish the earth remains in force. We further declare that God has commanded that the sacred powers of procreation are to be employed only between man and woman, lawfully wedded as husband and wife.", 
  "WE DECLARE the means by which mortal life is created to be divinely appointed. We affirm the sanctity of life and of its importance in God's eternal plan.", 
  "HUSBAND AND WIFE have a solemn responsibility to love and care for each other and for their children. \"Children are an heritage of the Lord\" (Psalm 127:3). Parents have a sacred duty to rear their children in love and righteousness, to provide for their physical and spiritual needs, and to teach them to love and serve one another, observe the commandments of God, and be law-abiding citizens wherever they live. Husbands and wives - mothers and fathers - will be held accountable before God for the discharge of these obligations.", 
  "THE FAMILY is ordained of God. Marriage between man and woman is essential to His eternal plan. Children are entitled to birth within the bonds of matrimony, and to be reared by a father and a mother who honor marital vows with complete fidelity. Happiness in family life is most likely to be achieved when founded upon the teachings of the Lord Jesus Christ. Successful marriages and families are established and maintained on principles of faith, prayer, repentance, forgiveness, respect, love, compassion, work, and wholesome recreational activities. By divine design, fathers are to preside over their families in love and righteousness and are responsible to provide the necessities of life and protection for their families. Mothers are primarily responsible for the nurture of their children. In these sacred responsibilities, fathers and mothers are obligated to help one another as equal partners. Disability, death, or other circumstances may necessitate individual adaptation. Extended families should lend support when needed.", 
  "WE WARN that individuals who violate covenants of chastity, who abuse spouse or offspring, or who fail to fulfill family responsibilities will one day stand accountable before God. Further, we warn that the disintegration of the family will bring upon individuals, communities, and nations the calamities foretold by ancient and modern prophets.", 
  "WE CALL UPON responsible citizens and officers of government everywhere to promote those measures designed to maintain and strengthen the family as the fundamental unit of society."
]

var hardness = 6 - window.__settings__.level;

function populate_test() {
  let postElement = document.getElementById('paragraphs');
  postElement.innerHTML = '';
  paragraphs.forEach((content, i) => {
    postElement.innerHTML += `<p id='${i+1}'>${questionize(content)}</p>`;
  });
}

var tests = [];
function questionize(content) {
  var words = content.split(" ");
  var reassembled = "";

  for (var i = 0; i < words.length; i++) {
    var change = Math.floor((Math.random() * hardness) + 1);

    if (change == 1 && words[i].length > 3) {
      var filtered = words[i].replace(".", "");
      filtered = filtered.replace(",", "")
                         .replace(" ", "")
                         .replace("?", "")
                         .replace("!", "")
                         .replace("\"", "");
      tests.push(filtered);
      words[i] = "<input type = 'text' id = 't" + (tests.length - 1) + "' size = '" + words[i].length + "'/>";
    }

    reassembled += words[i] + " ";
  }

  return reassembled;
}

function grade() {
  var post = document.getElementById('grade');

  var grade = 0;

  for (var i = 0; i < tests.length; i++) {
    var right_word = tests[i];
    let inputElement = document.getElementById("t" + i);
    var your_word = inputElement.value;
    if (your_word.toLowerCase().trim() == right_word.toLowerCase()) {
      grade++;
      inputElement.classList.remove('err');
      inputElement.title = "";
    } else {
      inputElement.classList.add('err');
      inputElement.title = `Correct word was "${right_word}"`
    }
  }

  post.innerHTML = "You got " + grade + " of " + tests.length +
    " correct: " + Math.floor(grade * 100 / tests.length) + "%";
}

function update_level(elem) {
  hardness = 6 - elem.value;
  tests = [];
  document.getElementById('grade').innerHTML = "";
  populate_test();
}
