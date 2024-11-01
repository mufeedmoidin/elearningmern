const courseSchema = require("../model/course");

const InsertCourse = async (req, res) => {
  try {
    // console.log(req.body, "insert");
    const { title, category, level,price, description, roadmap, chapters } = req.body;

    const parsedChapter = JSON.parse(chapters);
    const parsedroadmap = JSON.parse(roadmap);

    // let re = req.files.filter((i)=>i.fieldname == 'thumbnail' ? i.filename : null);
    let filteredThumbnail = req.files
      .filter((i) => i.fieldname === "thumbnail")
      .map((i) => i.filename);

    // let filteredContent = req.files.filter((i)=>i.fieldname == 'content').map(i => i.filename);

    // let updatedChapters = parsedChapter.map((chapter, index) => {
    //     let updatedChapter = { ...chapter };
    //     updatedChapter.content = filteredContent[index];
    //     return updatedChapter;
    //   });

    console.log(parsedChapter);

    const coueseInfo = new courseSchema({
      title,
      category,
      level,
      price,
      thumbnail: filteredThumbnail[0],
      description,
      roadmap: parsedroadmap,
      chapters: parsedChapter,
    });

    const courseSaved = await coueseInfo.save();
    res.send(courseSaved);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const GetCourse = async (req, res) => {
  try {
    const course = await courseSchema.find();
    res.send(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};


const GetSingleCourse = async (req, res) => {
  try {
    const course = await courseSchema.findById(req.params.id);
    res.send(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};

const UpdateCourse =  async (req,res)=>{


    try{
        const { title, category, level, description, roadmap, chapters } = req.body;

        const parsedChapter = JSON.parse(chapters);
        const parsedroadmap = JSON.parse(roadmap);

        // console.log(parsedChapter,'parsedChapter')
    
        // let re = req.files.filter((i)=>i.fieldname == 'thumbnail' ? i.filename : null);
        // let filteredThumbnail = req.files
        //   .filter((i) => i.fieldname === "thumbnail")
        //   .map((i) => i.filename);

        //   let a = req.files.map((i)=>i.filename);
        // const thumbnail=req.file.filename;
        const thumbnail = req.file ? req.file.filename : undefined;


          console.log(parsedroadmap,100000)

    
        const newCourse = {};
        if (title) { newCourse.title = title };
        if (category) { newCourse.category = category };
        if (level) { newCourse.level = level };
        if (thumbnail) { newCourse.thumbnail =   thumbnail};
        if (description) { newCourse.description = description };
        if (roadmap) { newCourse.roadmap = parsedroadmap };
        if (chapters) { newCourse.chapters = parsedChapter };
        
        let newData = await courseSchema.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Not Found");
        }

        console.log(newCourse,'newCourse')

        newData = await courseSchema.findByIdAndUpdate(req.params.id,{
        $set: newCourse }, { new: true })
        res.json({ newData});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}


const DeleteCourse =  async (req, res)=> {
    try{
        let course = await courseSchema.findById(req.params.id);
        if (!course) {
            return res.status(404).send("Not Found");
        }
        course = await courseSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Course deleted successfully", course : course });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}

module.exports = { InsertCourse, GetCourse, GetSingleCourse,UpdateCourse ,DeleteCourse};
