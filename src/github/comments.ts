import { Octokit } from '@octokit/rest';

export enum UpsertResult {
  Created = 'created',
  Updated = 'updated',
}

export function createOctokit({ auth }: { auth: string }) {
  return new Octokit({ auth });
}

export async function upsertComment({
  octokit,
  owner,
  repo,
  prNumber,
  comment,
  pattern,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  prNumber: number;
  comment: string;
  pattern: RegExp;
}): Promise<UpsertResult> {
  const { data: comments } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: prNumber,
  });

  const existingComment = comments.find(
    (possibleMatchingComment) =>
      possibleMatchingComment.body && pattern.test(possibleMatchingComment.body),
  );

  if (existingComment) {
    await octokit.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: comment,
    });
    return UpsertResult.Updated;
  }

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: comment,
  });
  return UpsertResult.Created;
}
