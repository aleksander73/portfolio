class Project {
    constructor(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        this.name = name;
        this.description = description;
        this.features = features;
        this.highlights = highlights;
        this.githubRepo = githubRepo;
        this.technologies = technologies;
        this.technologyId = technologyId;
        this.status = status;
        this.tags = tags;
        this.pictures = pictures;
        this.ytVideoId = ytVideoId;
        this.score = score;
        this.color = color;
    }
}

module.exports = Project;
