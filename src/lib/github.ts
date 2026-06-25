const GITHUB_USERNAME = 'nayan2723';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  stars: number;
  languages: Record<string, number>;
  topLanguage: string;
}

export const fetchGitHubStats = async (): Promise<GitHubStats | null> => {
  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!userRes.ok) throw new Error('Failed to fetch user');
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (!reposRes.ok) throw new Error('Failed to fetch repos');
    const reposData = await reposRes.json();

    let totalStars = 0;
    const languages: Record<string, number> = {};

    reposData.forEach((repo: any) => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    const stats: GitHubStats = {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      stars: totalStars,
      languages,
      topLanguage,
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats, timestamp: Date.now() }));
    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
};
