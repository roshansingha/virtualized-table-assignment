import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Location = 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo';
type Health = 'Healthy' | 'Injured' | 'Critical';

interface Entity {
    id: string;
    name: string;
    location: Location;
    health: Health;
    power: number;
}

// Seeded random number generator for reproducibility
class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    choice<T>(array: T[]): T {
        return array[Math.floor(this.next() * array.length)];
    }
}

const locations: Location[] = ['Konoha', 'Suna', 'Kiri', 'Iwa', 'Kumo'];
const healthStates: Health[] = ['Healthy', 'Injured', 'Critical'];

const firstNames = [
    'Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Hinata', 'Shikamaru', 'Gaara', 'Rock', 'Neji', 'Tenten',
    'Ino', 'Choji', 'Kiba', 'Shino', 'Kurenai', 'Asuma', 'Jiraiya', 'Tsunade', 'Orochimaru', 'Itachi',
    'Kisame', 'Deidara', 'Sasori', 'Hidan', 'Kakuzu', 'Konan', 'Pain', 'Obito', 'Madara', 'Hashirama',
    'Tobirama', 'Hiruzen', 'Minato', 'Kushina', 'Yamato', 'Sai', 'Temari', 'Kankuro', 'Chiyo', 'Mei',
    'Ao', 'Chojuro', 'Darui', 'Killer', 'Raikage', 'Onoki', 'Kurotsuchi', 'Akatsuchi', 'Zabuza', 'Haku'
];

const lastNames = [
    'Uzumaki', 'Uchiha', 'Haruno', 'Hatake', 'Hyuga', 'Nara', 'Sabaku', 'Lee', 'Yamanaka', 'Akimichi',
    'Inuzuka', 'Aburame', 'Yuhi', 'Sarutobi', 'Senju', 'Namikaze', 'Terumi', 'Momochi', 'Yuki', 'Hoshigaki'
];

function generateEntities(count: number, seed: number = 42): Entity[] {
    const rng = new SeededRandom(seed);
    const entities: Entity[] = [];
    const usedNames = new Set<string>();

    for (let i = 0; i < count; i++) {
        let name: string;
        let attempts = 0;

        // Generate unique names
        do {
            const firstName = rng.choice(firstNames);
            const lastName = rng.choice(lastNames);
            name = `${firstName} ${lastName}`;
            attempts++;

            // If we can't find a unique name after 100 attempts, append a number
            if (attempts > 100) {
                name = `${name} ${i}`;
                break;
            }
        } while (usedNames.has(name));

        usedNames.add(name);

        entities.push({
            id: `entity-${i.toString().padStart(4, '0')}`,
            name,
            location: rng.choice(locations),
            health: rng.choice(healthStates),
            power: rng.nextInt(100, 10000),
        });
    }

    return entities;
}

// Generate 1000 entities
const entities = generateEntities(1000);

// Create db.json for json-server
const db = { entities };

// Write to file
const outputPath = join(process.cwd(), '../api/data/db.json');
writeFileSync(outputPath, JSON.stringify(db, null, 2));

console.log(`✅ Generated ${entities.length} entities`);
console.log(`📁 Saved to: ${outputPath}`);
console.log(`🚀 Run: pnpm json-server`);
