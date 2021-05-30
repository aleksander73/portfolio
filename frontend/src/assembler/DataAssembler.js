class DataAssembler {
    assebleProject(project, technologies) {
        return {
            _id: project._id,
            name: project.name,
            description: project.description,
            features: project.features,
            highlights: project.highlights,
            githubRepo: project.githubRepo,
            technologies: project.technologies.map(_id => technologies.find(x => x._id === _id)),
            technology: technologies.find(x => x._id === project.technologyId),
            status: project.status,
            tags: project.tags,
            pictures: project.pictures,
            ytVideoId: project.ytVideoId,
            score: project.score,
            color: project.color
        };
    }
}

export default Object.freeze(new DataAssembler());
