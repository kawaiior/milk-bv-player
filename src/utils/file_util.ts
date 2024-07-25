import fs from "fs";
import path from "path";
import {spawn} from "node:child_process";

const UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";
const Referer = "https://www.bilibili.com/";

const downloadFolder = path.join(__dirname, "..", "..", "download");

if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
}

let ffmpegPath = "";
const configPath = path.join(__dirname, "..", "..", "config.json");

if (fs.existsSync(configPath)){
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    ffmpegPath = config.ffmpeg_path;
}

const downloadFile = async (fileName: string, downloadUrl: string, sessdata: string) => {
    const response = await fetch(downloadUrl, {
        headers: {
            Cookie: 'SESSDATA='+sessdata,
            "User-Agent": UserAgent,
            "Referer": Referer
        }
    });
    if (!response.ok) {
        return {
            success: false,
            data: response
        };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(downloadFolder, fileName);
    fs.writeFileSync(filePath, buffer);
}

const formatVideo = async (bv: string) => {
    const videoPath = path.join(downloadFolder, `${bv}_video.m4s`);
    const audioPath = path.join(downloadFolder, `${bv}_audio.m4s`);
    console.log(ffmpegPath)
    if (ffmpegPath){
        const ffmpeg = spawn(ffmpegPath, [
            '-i', videoPath,
            '-i', audioPath,
            '-vcodec', 'copy',
            '-acodec', 'copy',
            path.join(downloadFolder, `${bv}.mp4`)
        ]);

        return await new Promise((resolve, reject) => {
            ffmpeg.on('close', (code) => {
                if (code === 0) {
                    console.log(`Video ${bv} has been successfully merged.`);
                    // 删除m4s文件
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(audioPath);
                    resolve(true);
                } else {
                    console.error(`Failed to merge video ${bv}.`);
                    resolve(false);
                }
            });
        });
    }
}

const openDownloadFolder = async () => {
    const folderPath = path.join(downloadFolder);
    const { exec } = require('child_process');
    exec(`start "" "${folderPath}"`);
}

export {
    downloadFile,
    formatVideo,
    openDownloadFolder
}
