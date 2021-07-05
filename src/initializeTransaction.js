const {Sequelize, Op, Transaction} = require('sequelize');
const sequelize = require('./dbConnection').sequelize;

const initializeTransaction = async (request) =>{
    console.log("Request ID: ", request.id);
    try{
        const tranData = sequelize.define('tran_data', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true},
            status: {
                type:Sequelize.STRING}
            },{
                timestamps: false
            });

        //Read with lock on one row. SELECT FOR UPDATE
        const firstTran = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED});
        const firstResult = await tranData.findAll({
                where : {
                    status:{ [Op.eq]: null}
                },
                order: [
                    ['id', 'ASC']
                ],
                limit: 1,
                lock: true,
                skipLocked: true,
                transaction: firstTran,
                attributes:['id']
                });

        //Update the previously fetch row
        if(firstResult.length > 0){
            const data1 = firstResult[0].id;
            console.log("First Fetch: ",data1);

            //Update the record with the request ID
            const updateStatus = await tranData.update({
                status: request.id
            },
            {
                where : {
                    id: data1
                },
                transaction: firstTran
            });

            console.log("Update Status: ",updateStatus);        
        }

        //Read with lock on next available row. SELECT FOR UPDATE
        const secondTran = await sequelize.transaction();
        const secondResult = await tranData.findAll({
                limit: 1,
                lock: true,
                skipLocked: true,
                transaction: secondTran
                });
        
        if(secondResult.length > 0){
            console.log("Second Fetch: ",secondResult[0].id)
        }
        
        await Promise.all([
                firstTran.commit(),
                secondTran.commit()
                ]);
        return firstResult.length;
    }
    catch(error){
        throw(error);
    }
};


module.exports = {
    initializeTransaction
};