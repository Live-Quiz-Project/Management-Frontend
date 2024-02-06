export const liveHistoryData : ILiveHistoryData[] = [
    {
        creator_name: "You",
        title: "Math Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852890720972883/IMG_9028.jpg?ex=65b08b7c&is=659e167c&hm=62f766768e59e8ac0d4d426ab5120de2278cd0bd7fc33a70f9795ecf3eb8c9c7&=&format=webp&width=1560&height=1170",
        updated_at:"2024-02-01T15:57:49.114064+07:00"
    },
    {
        creator_name: "You",
        title: "Englist Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
        updated_at: "2024-02-02T15:57:49.114064+07:00"
    },
    {
        creator_name: "You",
        title: "Science Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
        updated_at: "2024-01-01T15:57:49.114064+07:00"
    },
    {
        creator_name: "You",
        title: "Art Quiz",
        cover_image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
        updated_at: "2024-01-14T15:57:49.114064+07:00"
    }
]

export interface ILiveHistoryData {
    creator_name: string;
    title: string;
    cover_image: string;
    updated_at: string;
}
