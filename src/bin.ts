import { createCommand } from 'commander';
import getStdin from 'get-stdin';
import { logInfo, logSuccess } from './log.js';
import { createOctokit, upsertComment, UpsertResult } from './github/comments.js';

async function main({
  token,
  owner,
  repo,
  prNumber: rawPrNumber,
  comment: rawComment,
  pattern: rawPattern,
}: {
  token: string;
  owner: string;
  repo: string;
  prNumber: string;
  comment: string;
  pattern: string;
}) {
  const prNumber = parseInt(rawPrNumber, 10);
  if (Number.isNaN(prNumber)) {
    throw new Error(`Invalid PR number: ${rawPrNumber}`);
  }
  const pattern = new RegExp(rawPattern);
  const octokit = createOctokit({ auth: token });
  const comment = rawComment === '-' ? await getStdin() : rawComment;
  logInfo('Upserting comment...');
  const result = await upsertComment({
    octokit,
    owner,
    repo,
    prNumber,
    comment,
    pattern: new RegExp(pattern),
  });
  switch (result) {
    case UpsertResult.Created:
      logSuccess('Created comment');
      break;
    case UpsertResult.Updated:
      logSuccess('Updated comment');
      break;
    default: {
      const error = new Error(`Unexpected result`);
      (error as unknown as { result: UpsertResult }).result = result;
      throw error;
    }
  }
}

export function createRootCommand() {
  const command = createCommand();
  command
    .name('github-upsert-pr-comment')
    .description('Upsert (create or update) a comment on a GitHub PR.')
    .requiredOption('-t, --token <token>', 'A GitHub personal access token')
    .requiredOption('-o, --owner <owner>', 'GitHub owner, e.g. "nursefly"')
    .requiredOption('-r, --repo <repo>', 'GitHub repo, e.g. "nursefly-web"')
    .requiredOption('-n, --pr-number <pr-number>', 'GitHub PR number, e.g. 123456')
    .requiredOption('-c, --comment <comment>', 'Comment body')
    .requiredOption('-p, --pattern <pattern>', 'RegExp pattern to match existing comment')
    .action(main)
    .showHelpAfterError();
  return command;
}
