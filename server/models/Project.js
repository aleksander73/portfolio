class Project {
    constructor(name, description, githubRepo, technologies, technologyTag, pictures, ytVideoId, score) {
        this.name = name;
        this.description = description;
        this.githubRepo = githubRepo;
        this.technologies = technologies;
        this.technologyTag = technologyTag;
        this.pictures = pictures;
        this.ytVideoId = ytVideoId;
        this.score = score;
    }
}

module.exports = Project;
