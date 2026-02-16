// Pet MindAxis App
const app = {
    petData: {
        type: null,
        name: '',
        personality: null,
        traits: {},
        answers: []
    },
    
    journals: [],
    chatHistory: [],
    
    // 診断質問データ
    questions: {
        dog: [
            {
                id: 1,
                question: "散歩の時、他の犬に会うとどうしますか？",
                options: [
                    { text: "すぐに近づいて挨拶したがる", score: { sociability: 5, energy: 4 } },
                    { text: "興味を示すが慎重に様子を見る", score: { sociability: 3, energy: 2 } },
                    { text: "あまり興味を示さない", score: { sociability: 1, energy: 1 } }
                ]
            },
            {
                id: 2,
                question: "家で一人になった時、どんな様子ですか？",
                options: [
                    { text: "落ち着いて過ごせる", score: { independence: 5, anxiety: 1 } },
                    { text: "少し不安そうだが大丈夫", score: { independence: 3, anxiety: 3 } },
                    { text: "とても不安そうで吠える", score: { independence: 1, anxiety: 5 } }
                ]
            },
            {
                id: 3,
                question: "新しいおもちゃを見た時の反応は？",
                options: [
                    { text: "すぐに興味を示して遊び始める", score: { curiosity: 5, playfulness: 5 } },
                    { text: "しばらく観察してから遊ぶ", score: { curiosity: 3, playfulness: 3 } },
                    { text: "あまり興味を示さない", score: { curiosity: 1, playfulness: 1 } }
                ]
            },
            {
                id: 4,
                question: "運動量はどのくらい必要ですか？",
                options: [
                    { text: "たくさん運動が必要", score: { energy: 5, stamina: 5 } },
                    { text: "適度な運動で満足", score: { energy: 3, stamina: 3 } },
                    { text: "あまり運動しなくても平気", score: { energy: 1, stamina: 1 } }
                ]
            },
            {
                id: 5,
                question: "食事の時間になると？",
                options: [
                    { text: "とても興奮して待ちきれない", score: { foodMotivation: 5, excitement: 5 } },
                    { text: "喜ぶが落ち着いている", score: { foodMotivation: 3, excitement: 2 } },
                    { text: "マイペースで食べる", score: { foodMotivation: 2, excitement: 1 } }
                ]
            }
        ],
        cat: [
            {
                id: 1,
                question: "人が近づくと？",
                options: [
                    { text: "すぐに甘えてくる", score: { sociability: 5, affection: 5 } },
                    { text: "気分次第で反応が変わる", score: { sociability: 3, affection: 3 } },
                    { text: "あまり近づかない", score: { sociability: 1, affection: 1 } }
                ]
            },
            {
                id: 2,
                question: "一日の大半をどう過ごしていますか？",
                options: [
                    { text: "活発に動き回っている", score: { energy: 5, playfulness: 4 } },
                    { text: "寝たり遊んだりバランス良く", score: { energy: 3, playfulness: 3 } },
                    { text: "ほとんど寝ている", score: { energy: 1, playfulness: 1 } }
                ]
            },
            {
                id: 3,
                question: "知らない人が来た時の反応は？",
                options: [
                    { text: "興味を持って近づく", score: { curiosity: 5, fearfulness: 1 } },
                    { text: "遠くから様子を見る", score: { curiosity: 3, fearfulness: 3 } },
                    { text: "隠れてしまう", score: { curiosity: 1, fearfulness: 5 } }
                ]
            },
            {
                id: 4,
                question: "遊びの好みは？",
                options: [
                    { text: "激しい遊びが大好き", score: { playfulness: 5, huntingInstinct: 5 } },
                    { text: "ゆったりした遊びが好き", score: { playfulness: 3, huntingInstinct: 2 } },
                    { text: "あまり遊ばない", score: { playfulness: 1, huntingInstinct: 1 } }
                ]
            },
            {
                id: 5,
                question: "鳴き声の頻度は？",
                options: [
                    { text: "よく鳴いてコミュニケーションを取る", score: { vocalization: 5, communication: 5 } },
                    { text: "必要な時だけ鳴く", score: { vocalization: 3, communication: 3 } },
                    { text: "ほとんど鳴かない", score: { vocalization: 1, communication: 1 } }
                ]
            }
        ]
    },

    // 性格タイプ定義
    personalityTypes: {
        dog: {
            energetic: { name: "元気いっぱいタイプ", icon: "🐕‍🦺", description: "とっても活発で遊ぶのが大好き！散歩や運動が何よりの楽しみです。" },
            friendly: { name: "社交的タイプ", icon: "🦮", description: "人や他の犬が大好き！誰とでも仲良くなれる愛されキャラです。" },
            calm: { name: "おっとりタイプ", icon: "🐕", description: "落ち着いた性格でマイペース。穏やかに過ごすのが好きです。" },
            loyal: { name: "忠実タイプ", icon: "🐶", description: "飼い主さん一筋！とても忠実で頼れるパートナーです。" }
        },
        cat: {
            playful: { name: "やんちゃタイプ", icon: "😺", description: "好奇心旺盛でいたずら好き！遊ぶのが大好きな元気な子です。" },
            affectionate: { name: "甘えん坊タイプ", icon: "😻", description: "人が大好きで甘えん坊。いつも一緒にいたがります。" },
            independent: { name: "マイペースタイプ", icon: "😸", description: "自立心が強くクール。自分の時間を大切にします。" },
            curious: { name: "探検家タイプ", icon: "🐱", description: "何でも調べたがる好奇心の塊！冒険が大好きです。" }
        }
    },

    init() {
        this.loadData();
        this.checkFirstVisit();
        this.updateStats();
    },

    checkFirstVisit() {
        if (this.petData.personality) {
            this.showHome();
        }
    },

    loadData() {
        const savedPetData = localStorage.getItem('petData');
        const savedJournals = localStorage.getItem('journals');
        const savedChatHistory = localStorage.getItem('chatHistory');

        if (savedPetData) this.petData = JSON.parse(savedPetData);
        if (savedJournals) this.journals = JSON.parse(savedJournals);
        if (savedChatHistory) this.chatHistory = JSON.parse(savedChatHistory);
    },

    saveData() {
        localStorage.setItem('petData', JSON.stringify(this.petData));
        localStorage.setItem('journals', JSON.stringify(this.journals));
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');

        // 画面ごとの初期化
        if (screenId === 'homeScreen') this.updateHome();
        if (screenId === 'journalScreen') this.updateJournalList();
        if (screenId === 'chatScreen') this.updateChatMessages();
        if (screenId === 'statsScreen') this.updateStats();
        if (screenId === 'settingsScreen') this.updateSettings();
    },

    showPetTypeSelection() {
        this.showScreen('petTypeScreen');
    },

    selectPetType(type) {
        this.petData.type = type;
        document.querySelectorAll('.pet-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.pet-type-card').classList.add('selected');
        document.getElementById('continueButton').style.display = 'block';
    },

    startDiagnosis() {
        if (!this.petData.type) {
            alert('ペットタイプを選択してください');
            return;
        }
        this.showScreen('diagnosisScreen');
        this.renderQuestions();
    },

    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        const questions = this.questions[this.petData.type];
        
        container.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'diagnosis-question';
            questionDiv.innerHTML = `
                <h3>Q${index + 1}. ${q.question}</h3>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <div class="option" onclick="app.selectAnswer(${index}, ${optIndex})">
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(questionDiv);
        });
    },

    selectAnswer(questionIndex, optionIndex) {
        const questions = this.questions[this.petData.type];
        const question = questions[questionIndex];
        const option = question.options[optionIndex];

        // 既存の回答を更新
        this.petData.answers[questionIndex] = {
            questionId: question.id,
            selectedOption: optionIndex,
            scores: option.score
        };

        // UIを更新
        const questionDiv = document.querySelectorAll('.diagnosis-question')[questionIndex];
        questionDiv.querySelectorAll('.option').forEach((opt, idx) => {
            opt.classList.toggle('selected', idx === optionIndex);
        });

        // 進捗バーを更新
        const progress = ((questionIndex + 1) / questions.length) * 100;
        document.getElementById('progressBar').style.width = progress + '%';

        // 全ての質問に答えたら送信ボタンを表示
        if (this.petData.answers.filter(a => a).length === questions.length) {
            document.getElementById('submitDiagnosis').style.display = 'block';
        }
    },

    submitDiagnosis() {
        // スコアを集計
        const traits = {};
        this.petData.answers.forEach(answer => {
            Object.entries(answer.scores).forEach(([trait, score]) => {
                traits[trait] = (traits[trait] || 0) + score;
            });
        });

        this.petData.traits = traits;

        // 性格タイプを判定
        this.petData.personality = this.determinePersonality(traits);
        
        this.saveData();
        this.showResults();
    },

    determinePersonality(traits) {
        if (this.petData.type === 'dog') {
            const avgEnergy = (traits.energy || 0) / 2;
            const avgSociability = (traits.sociability || 0);
            
            if (avgEnergy > 7) return 'energetic';
            if (avgSociability > 4) return 'friendly';
            if (traits.independence > 3) return 'calm';
            return 'loyal';
        } else {
            const avgPlayfulness = (traits.playfulness || 0);
            const avgAffection = (traits.affection || 0);
            const avgCuriosity = (traits.curiosity || 0);
            
            if (avgPlayfulness > 4) return 'playful';
            if (avgAffection > 4) return 'affectionate';
            if (avgCuriosity > 4) return 'curious';
            return 'independent';
        }
    },

    showResults() {
        const personality = this.personalityTypes[this.petData.type][this.petData.personality];
        
        document.getElementById('resultIcon').textContent = personality.icon;
        document.getElementById('personalityType').textContent = personality.name;
        document.getElementById('personalityDescription').textContent = personality.description;

        // 性格特性を表示
        const traitsContainer = document.getElementById('personalityTraits');
        traitsContainer.innerHTML = '';
        
        Object.entries(this.petData.traits).forEach(([trait, score]) => {
            const percentage = (score / 5) * 100;
            const traitDiv = document.createElement('div');
            traitDiv.className = 'personality-trait';
            traitDiv.innerHTML = `
                <div class="trait-name">${this.getTraitName(trait)}</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            traitsContainer.appendChild(traitDiv);
        });

        this.showScreen('resultScreen');
    },

    getTraitName(trait) {
        const names = {
            sociability: '社交性',
            energy: 'エネルギー',
            independence: '自立心',
            anxiety: '不安度',
            curiosity: '好奇心',
            playfulness: '遊び好き',
            stamina: 'スタミナ',
            foodMotivation: '食欲',
            excitement: '興奮度',
            affection: '甘えん坊度',
            fearfulness: '臆病さ',
            huntingInstinct: '狩猟本能',
            vocalization: '鳴き声',
            communication: 'コミュニケーション'
        };
        return names[trait] || trait;
    },

    showHome() {
        const personality = this.personalityTypes[this.petData.type]?.[this.petData.personality];
        
        if (personality) {
            document.getElementById('homeIcon').textContent = personality.icon;
            document.getElementById('homePetName').textContent = this.petData.name || 'マイペット';
            document.getElementById('homePersonalityType').textContent = personality.name;
        }
        
        this.showScreen('homeScreen');
    },

    updateHome() {
        const personality = this.personalityTypes[this.petData.type]?.[this.petData.personality];
        
        if (personality) {
            document.getElementById('homeIcon').textContent = personality.icon;
            document.getElementById('homePetName').textContent = this.petData.name || 'マイペット';
            document.getElementById('homePersonalityType').textContent = personality.name;
        }
    },

    addJournalEntry() {
        const input = document.getElementById('journalInput');
        const content = input.value.trim();
        
        if (!content) {
            alert('内容を入力してください');
            return;
        }

        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            content: content
        };

        this.journals.unshift(entry);
        this.saveData();
        
        input.value = '';
        this.updateJournalList();
        this.updateStats();
    },

    updateJournalList() {
        const container = document.getElementById('journalEntries');
        
        if (this.journals.length === 0) {
            container.innerHTML = '<div class="result-card"><p style="text-align:center; color: var(--text-secondary);">まだ日記がありません</p></div>';
            return;
        }

        container.innerHTML = this.journals.map(entry => {
            const date = new Date(entry.date);
            const dateStr = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            return `
                <div class="journal-entry">
                    <div class="journal-date">${dateStr}</div>
                    <div class="journal-content">${entry.content}</div>
                </div>
            `;
        }).join('');
    },

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // ユーザーメッセージを追加
        this.chatHistory.push({
            type: 'user',
            content: message,
            timestamp: new Date().toISOString()
        });

        input.value = '';
        this.updateChatMessages();

        // AIの返信を生成（シミュレーション）
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.chatHistory.push({
                type: 'pet',
                content: response,
                timestamp: new Date().toISOString()
            });
            this.saveData();
            this.updateChatMessages();
            this.updateStats();
        }, 1000);
    },

    generateAIResponse(userMessage) {
        const personality = this.personalityTypes[this.petData.type]?.[this.petData.personality];
        const petName = this.petData.name || 'ペット';
        
        // シンプルなルールベースの返信
        const responses = {
            dog: {
                energetic: [
                    `わん！${petName}だよ！遊ぼうよ！🎾`,
                    "散歩行きたいなぁ〜！外に出ようよ！🐕",
                    "楽しいことないかな？一緒に何かしよう！✨"
                ],
                friendly: [
                    `${petName}はみんなが大好き！🐶`,
                    "一緒にいられて嬉しいな！",
                    "なでなでしてくれる？💕"
                ],
                calm: [
                    "のんびり過ごすのが好きだよ",
                    `${petName}は今、リラックスしてるよ😌`,
                    "ゆっくりした時間が幸せだな"
                ],
                loyal: [
                    "いつもそばにいるよ！",
                    `${petName}はあなたが一番大切だよ❤️`,
                    "守ってあげるからね！"
                ]
            },
            cat: {
                playful: [
                    "にゃー！遊んで遊んで！🎯",
                    `${petName}は今、遊びたい気分だよ！`,
                    "面白いもの見つけた？😺"
                ],
                affectionate: [
                    "なでて〜💕",
                    `${petName}はあなたが大好きにゃ`,
                    "一緒にいたいな〜😻"
                ],
                independent: [
                    "今はひとりの時間が欲しいかも",
                    `${petName}のペースで過ごさせてね`,
                    "必要な時は呼ぶからね😸"
                ],
                curious: [
                    "これは何？教えて！",
                    `${petName}は探検中だよ🔍`,
                    "新しいことがあったら見せてね！"
                ]
            }
        };

        const petResponses = responses[this.petData.type]?.[this.petData.personality] || ["にゃん！", "わん！"];
        return petResponses[Math.floor(Math.random() * petResponses.length)];
    },

    updateChatMessages() {
        const container = document.getElementById('chatMessages');
        
        if (this.chatHistory.length === 0) {
            const petName = this.petData.name || 'ペット';
            const personality = this.personalityTypes[this.petData.type]?.[this.petData.personality];
            container.innerHTML = `
                <div class="chat-message pet">
                    <div class="message-bubble">
                        ${personality.icon} こんにちは！${petName}だよ！何か話しかけてね！
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.chatHistory.map(msg => `
            <div class="chat-message ${msg.type}">
                <div class="message-bubble">${msg.content}</div>
            </div>
        `).join('');

        // スクロールを最下部に
        container.scrollTop = container.scrollHeight;
    },

    updateStats() {
        document.getElementById('journalCount').textContent = this.journals.length;
        document.getElementById('chatCount').textContent = this.chatHistory.filter(m => m.type === 'user').length;
    },

    updateSettings() {
        document.getElementById('petNameInput').value = this.petData.name || '';
    },

    savePetName() {
        const name = document.getElementById('petNameInput').value.trim();
        if (name) {
            this.petData.name = name;
            this.saveData();
            alert('保存しました！');
            this.updateHome();
        }
    },

    resetDiagnosis() {
        if (confirm('診断をやり直しますか？現在の診断結果は削除されます。')) {
            this.petData.personality = null;
            this.petData.traits = {};
            this.petData.answers = [];
            this.saveData();
            this.showScreen('welcomeScreen');
        }
    },

    clearAllData() {
        if (confirm('本当にすべてのデータを削除しますか？この操作は取り消せません。')) {
            localStorage.clear();
            location.reload();
        }
    }
};

// アプリ起動
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
