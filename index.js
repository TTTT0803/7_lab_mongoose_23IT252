const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('./models/Character');

const CHARACTER_NAME = 'Thao';
const ULTIMATE_SKILL = 'Shinku Hadoken';

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Chưa cấu hình MONGODB_URI trong file .env');
  }
  await mongoose.connect(uri);
  console.log('Database connected');
}

// Xóa dữ liệu cũ để chạy lại nhiều lần không bị trùng name
async function resetData() {
  await Character.deleteMany({ name: CHARACTER_NAME });
}

// Phần 6: Tạo và lưu Character bằng save()
async function createCharacter() {
  console.log('\n--- 6. Tạo và lưu Character ---');
  await resetData();

  const character = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });

  const savedCharacter = await character.save();
  console.log('Character saved:');
  console.log(savedCharacter);
}

// Phần 7: Thực hiện bằng Promise (then/catch)
async function createCharacterWithPromise() {
  console.log('\n--- 7. Thực hiện bằng Promise ---');
  await resetData();

  const character = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });

  return character.save()
    .then((savedCharacter) => {
      console.log('Character saved with Promise:');
      console.log(savedCharacter);
    })
    .catch((error) => {
      console.error('Error saving Character:', error.message);
      throw error;
    });
}

// Phần 8: Thực hiện bằng async/await
async function createCharacterWithAsyncAwait() {
  console.log('\n--- 8. Thực hiện bằng async/await ---');
  await resetData();

  const character = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });

  try {
    const savedCharacter = await character.save();
    console.log('Character saved with async/await:');
    console.log(savedCharacter);
  } catch (error) {
    console.error('Error saving Character:', error.message);
    throw error;
  }
}

// Phần 9: Kiểm tra unique cho trường name
async function testUniqueName() {
  console.log('\n--- 9. Kiểm tra tính duy nhất của name ---');
  await Character.deleteMany({});
  await Character.syncIndexes();

  console.log('[Lần 1] Lưu nhân vật:', CHARACTER_NAME);
  const first = new Character({
    name: CHARACTER_NAME,
    ultimate: ULTIMATE_SKILL
  });
  const doc1 = await first.save();
  console.log('Kết quả lần 1 (thành công):', doc1);

  console.log('[Lần 2] Thử lưu nhân vật trùng tên:', CHARACTER_NAME);
  const second = new Character({
    name: CHARACTER_NAME,
    ultimate: 'Hadouken'
  });

  try {
    await second.save();
    console.log('CẢNH BÁO: bản ghi trùng tên đã được lưu.');
  } catch (error) {
    if (error.code === 11000) {
      console.error('Kết quả lần 2 (báo lỗi E11000 trùng lặp):');
      console.error(error.message);
    } else {
      throw error;
    }
  }
}

async function main() {
  try {
    await connectDatabase();

    const mode = process.argv[2] || '8';
    if (mode === '6' || mode === 'save') {
      await createCharacter();
    } else if (mode === '7' || mode === 'promise') {
      await createCharacterWithPromise();
    } else if (mode === '8' || mode === 'async') {
      await createCharacterWithAsyncAwait();
    } else if (mode === '9' || mode === 'unique') {
      await testUniqueName();
    } else {
      console.log('Chế độ không hợp lệ. Dùng: 6 | 7 | 8 | 9');
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();