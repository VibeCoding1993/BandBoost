import type { PracticeTest } from "./practice-types";
import { test as bees } from "./tests/reading-bees";
import { test as sleep } from "./tests/reading-sleep";
import { test as gt } from "./tests/reading-gt";
import { test as booking } from "./tests/listening-booking";
import { test as lecture } from "./tests/listening-lecture";

export const practiceTests: PracticeTest[] = [booking, lecture, bees, sleep, gt];
export const testBySlug = (slug: string) => practiceTests.find((t) => t.slug === slug);
