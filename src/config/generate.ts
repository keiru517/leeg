import { writeFileSync } from 'fs';
import options from './config';
import { absolutePath } from '../helpers';

writeFileSync(absolutePath('src/config/config.json'), JSON.stringify(options));
