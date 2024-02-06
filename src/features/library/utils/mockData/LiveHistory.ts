export const liveHistoryData : ILiveHistoryData[] = [
    {
        id: '1',
        creator_name: "You",
        title: "Math Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852890720972883/IMG_9028.jpg?ex=65b08b7c&is=659e167c&hm=62f766768e59e8ac0d4d426ab5120de2278cd0bd7fc33a70f9795ecf3eb8c9c7&=&format=webp&width=1560&height=1170",
        updated_at:"2024-02-01T15:57:49.114064+07:00"
    },
    {
        id: '2',
        creator_name: "You",
        title: "Englist Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
        updated_at: "2024-02-02T15:57:49.114064+07:00"
    },
    {
        id: '3',
        creator_name: "You",
        title: "Science Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
        updated_at: "2024-01-01T15:57:49.114064+07:00"
    },
    {
        id: '4',
        creator_name: "You",
        title: "Art Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
        updated_at: "2024-01-14T15:57:49.114064+07:00"
    }
]

export const participantsHistoryDetailData = {
    id: "865bf37f-5447-47de-b0d5-56adb0f682d6",
    creator_id: "0cd2df1e-b159-4374-9199-2f9bc846aad3",
    title: "This is Mock Example for Testing",
    description: "Mock Data for Testing",
    cover_image: "default.png",
    created_at: "2024-02-05T00:09:01.461058+07:00",
    participants: [
        {
            id: "ab665003-487e-4e01-9fca-86bf2bd3c43c",
            user_id: "ede46026-0eac-4063-b884-ed5d0bb5d90b",
            name: "Participant 2",
            marks: 20,
            corrects: 2,
            incorrects: 2,
            unanswered: 1,
            total_questions: 5,
            total_marks: 0,
            questions: [
                {
                    id: "3b645356-b468-4a6e-b856-89ec0f8c1c63",
                    type: "CHOICE",
                    order: 1,
                    content: "Does this work?",
                    answer: "Nah fam",
                    mark: 0,
                    use_time: 3
                },
                {
                    id: "d43db2d6-05aa-4155-934b-99bbd0e26455",
                    type: "FILL_BLANK",
                    order: 3,
                    content: "I _ go to school by the _",
                    answer: "went, bus",
                    mark: 100,
                    use_time: 5
                },
                {
                    id: "915e9b39-152b-4932-a4c4-8d9d923e943e",
                    type: "PARAGRAPH",
                    order: 5,
                    content: "What is the main idea of this question",
                    answer: "Main character died at the end",
                    mark: 0,
                    use_time: 14
                },
                {
                    id: "d508ae92-cad6-4ac1-823d-6c79cbbc0c13",
                    type: "TRUE_FALSE",
                    order: 6,
                    content: "Is the main character die at the end?",
                    answer: "",
                    mark: 0,
                    use_time: 4
                },
                {
                    id: "85ba1b96-01d5-442c-a49f-74d0705f8f3e",
                    type: "MATCHING",
                    order: 7,
                    content: "Matching the ability that animals can do.",
                    answer: "Fish:Swim, Bird:Fly, Dog:Run",
                    mark: 20,
                    use_time: 18
                }
            ]
        },
        {
            id: "355dc982-eb59-4d17-8fee-494f8a32bfc3",
            user_id: "2da8df87-6688-4fdc-b14f-b302a18c2752",
            name: "Participant 3",
            marks: 20,
            corrects: 2,
            incorrects: 3,
            unanswered: 0,
            total_questions: 5,
            total_marks: 0,
            questions: [
                {
                    id: "f05f5e33-147a-494d-b050-87ee03549353",
                    type: "CHOICE",
                    order: 1,
                    content: "Does this work?",
                    answer: "Yeah sure",
                    mark: 100,
                    use_time: 5
                },
                {
                    id: "183488d8-5d12-41e8-83ad-d036d2449126",
                    type: "FILL_BLANK",
                    order: 3,
                    content: "I _ go to school by the _",
                    answer: "go, bus",
                    mark: 200,
                    use_time: 4
                },
                {
                    id: "91787141-11a8-40bf-8b1b-66ae4809de8c",
                    type: "PARAGRAPH",
                    order: 5,
                    content: "What is the main idea of this question",
                    answer: "No one dead",
                    mark: 0,
                    use_time: 7
                },
                {
                    id: "037f83fa-c814-479d-8b92-6ee817fd0305",
                    type: "TRUE_FALSE",
                    order: 6,
                    content: "Is the main character die at the end?",
                    answer: "FALSE",
                    mark: 0,
                    use_time: 2
                },
                {
                    id: "e06439d1-18d3-4b11-a235-dd96d3998b51",
                    type: "MATCHING",
                    order: 7,
                    content: "Matching the ability that animals can do.",
                    answer: "Fish:Fly, Bird:Swim, Dog:Run",
                    mark: 0,
                    use_time: 22
                }
            ]
        }
    ]
};


export interface ILiveHistoryData {
    id: string
    creator_name: string;
    title: string;
    cover_image: string;
    updated_at: string;
}
