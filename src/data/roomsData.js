export const roomsData = {
  vulnversity: {
    id: 'vulnversity',
    title: 'Vulnversity',
    ip: '10.10.14.52',
    descKey: 'room_vuln_d',
    topicKey: 'topic_recon',
    icon: 'fa-globe',
    diff: 'Easy',
    type: 'Walkthrough',
    category: 'Web',
    tags: ['Recon', 'GoBuster', 'SUID', 'Linux'],
    duration: '45 daq',
    users: '197,542',
    index: 1,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909b8.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'vuln_t1_t', dKey: 'vuln_t1_d', iKey: 'vuln_t1_info', qKey: 'vuln_t1_q', ans: '3128', hint: "Nmap -sV -p- 10.10.14.52 buyrug'i orqali barcha portlarni tekshiring." },
      { id: 2, tKey: 'vuln_t2_t', dKey: 'vuln_t2_d', iKey: 'vuln_t2_info', qKey: 'vuln_t2_q', ans: '/internal/', hint: "gobuster dir -u http://10.10.14.52:3333 -w /wordlists/common.txt orqali toping." },
      { id: 3, tKey: 'vuln_t3_t', dKey: 'vuln_t3_d', iKey: 'vuln_t3_info', qKey: 'vuln_t3_q', ans: '/bin/systemctl', hint: "find / -user root -perm -4000 -exec ls -ldb {} \\; orqali SUID binar fayllarni sanang." }
    ]
  },
  blue: {
    id: 'blue',
    title: 'Blue',
    ip: '10.10.32.11',
    descKey: 'room_blue_d',
    topicKey: 'topic_win',
    icon: 'fa-windows',
    diff: 'Easy',
    type: 'Walkthrough',
    category: 'Windows',
    tags: ['MS17-010', 'SMB', 'Metasploit', 'Windows'],
    duration: '35 daq',
    users: '183,921',
    index: 2,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909c8.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'blue_t1_t', dKey: 'blue_t1_d', iKey: 'blue_t1_info', qKey: 'blue_t1_q', ans: 'Windows 7', hint: "Nmap -O yoki smb-os-discovery skriptini ishga tushiring." },
      { id: 2, tKey: 'blue_t2_t', dKey: 'blue_t2_d', iKey: 'blue_t2_info', qKey: 'blue_t2_q', ans: 'exploit/windows/smb/ms17_010_eternalblue', hint: "msfconsole da 'search eternalblue' buyrug'ini bering." },
      { id: 3, tKey: 'blue_t3_t', dKey: 'blue_t3_d', iKey: 'blue_t3_info', qKey: 'blue_t3_q', ans: 'alqfna22', hint: "hashdump orqali olingan NTLM xeshini John the Ripper da oching." }
    ]
  },
  kenobi: {
    id: 'kenobi',
    title: 'Kenobi',
    ip: '10.10.45.22',
    descKey: 'room_kenobi_d',
    topicKey: 'topic_lin',
    icon: 'fa-linux',
    diff: 'Easy',
    type: 'Walkthrough',
    category: 'Linux',
    tags: ['Samba', 'ProFTPd', 'SUID', 'Path Hijack'],
    duration: '50 daq',
    users: '132,450',
    index: 3,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909d2.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'kenobi_t1_t', dKey: 'kenobi_t1_d', iKey: 'kenobi_t1_info', qKey: 'kenobi_t1_q', ans: 'log.txt', hint: "smbclient //10.10.45.22/anonymous buyrug'i bilan kiring." },
      { id: 2, tKey: 'kenobi_t2_t', dKey: 'kenobi_t2_d', iKey: 'kenobi_t2_info', qKey: 'kenobi_t2_q', ans: 'id_rsa', hint: "SITE CPFR /home/kenobi/.ssh/id_rsa va SITE CPTO /var/tmp/id_rsa buyrug'idan foydalaning." },
      { id: 3, tKey: 'kenobi_t3_t', dKey: 'kenobi_t3_d', iKey: 'kenobi_t3_info', qKey: 'kenobi_t3_q', ans: 'curl', hint: "strings /usr/bin/menu buyrug'i bilan ichidagi chaqiriqlarni ko'ring." }
    ]
  },
  pickle: {
    id: 'pickle',
    title: 'Pickle Rick',
    ip: '10.10.66.19',
    descKey: 'room_pickle_d',
    topicKey: 'topic_cmd',
    icon: 'fa-terminal',
    diff: 'Easy',
    type: 'Challenge',
    category: 'CTF',
    tags: ['Web Shell', 'Command Injection', 'Sudo', 'CTF'],
    duration: '40 daq',
    users: '142,668',
    index: 4,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909db.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'pickle_t1_t', dKey: 'pickle_t1_d', iKey: 'pickle_t1_info', qKey: 'pickle_t1_q', ans: 'R1ckRul3s', hint: "Ctrl+U bosib bosh sahifa manba kodini tekshiring." },
      { id: 2, tKey: 'pickle_t2_t', dKey: 'pickle_t2_d', iKey: 'pickle_t2_info', qKey: 'pickle_t2_q', ans: 'less', hint: "cat o'rniga 'less', 'head' yoki 'tac' orqali Sup3rS3cretPickl3Ingred.txt faylini o'qing." },
      { id: 3, tKey: 'pickle_t3_t', dKey: 'pickle_t3_d', iKey: 'pickle_t3_info', qKey: 'pickle_t3_q', ans: 'ALL', hint: "'sudo -l' buyrug'ini terminalga yuboring." }
    ]
  },
  owasp: {
    id: 'owasp',
    title: 'OWASP Top 10',
    ip: '10.10.88.99',
    descKey: 'room_owasp_d',
    topicKey: 'topic_owasp',
    icon: 'fa-bug',
    diff: 'Easy',
    type: 'Walkthrough',
    category: 'Web',
    tags: ['OWASP Top 10', 'SQLi', 'IDOR', 'XSS'],
    duration: '60 daq',
    users: '205,112',
    index: 5,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909e3.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'owasp_t1_t', dKey: 'owasp_t1_d', iKey: 'owasp_t1_info', qKey: 'owasp_t1_q', ans: '4444', hint: "nc -lvnp 4444 tinglash porti bo'lib xizmat qiladi." },
      { id: 2, tKey: 'owasp_t2_t', dKey: 'owasp_t2_d', iKey: 'owasp_t2_info', qKey: 'owasp_t2_q', ans: 'user_id', hint: "URL dagi ?user_id= parametri orqali boshqa foydalanuvchilar profiliga kiriladi." },
      { id: 3, tKey: 'owasp_t3_t', dKey: 'owasp_t3_d', iKey: 'owasp_t3_info', qKey: 'owasp_t3_q', ans: 'thm{cookie_monster}', hint: "document.cookie orqali admin sessiyasini ko'chirib oling." }
    ]
  },
  mrrobot: {
    id: 'mrrobot',
    title: 'Mr Robot CTF',
    ip: '10.10.111.23',
    descKey: 'room_mrrobot_d',
    topicKey: 'topic_boot',
    icon: 'fa-robot',
    diff: 'Medium',
    type: 'Challenge',
    category: 'CTF',
    tags: ['WordPress', 'Hydra', 'Robots.txt', 'Boot2Root'],
    duration: '90 daq',
    users: '89,431',
    index: 6,
    image: 'https://files.cdn-files-a.com/uploads/12382540/800_gi-6aa64cf3909ea.jpg?format=avif',
    tasks: [
      { id: 1, tKey: 'mrrobot_t1_t', dKey: 'mrrobot_t1_d', iKey: 'mrrobot_t1_info', qKey: 'mrrobot_t1_q', ans: '073403c8a58a1f80d943455fb30724b9', hint: "http://10.10.111.23/robots.txt manziliga kiring va key-1-of-3.txt ni o'qing." },
      { id: 2, tKey: 'mrrobot_t2_t', dKey: 'mrrobot_t2_d', iKey: 'mrrobot_t2_info', qKey: 'mrrobot_t2_q', ans: 'ER28-0652', hint: "fsocity.dic lug'ati bilan wpscan yoki hydra yordamida parolni toping." },
      { id: 3, tKey: 'mrrobot_t3_t', dKey: 'mrrobot_t3_d', iKey: 'mrrobot_t3_info', qKey: 'mrrobot_t3_q', ans: '04787ddef27c3311f072b71e56d81232', hint: "nmap --interactive deb yozing, keyin !sh orqali root bo'ling." }
    ]
  }
};
