<template>
    <modal name="requestTimeOff" width="600" height="500">
        <button class="closeButton" v-on:click="hide()">&#10006;</button>
        <h2 class="pageTitle">Request Time Off</h2>
        <hr>
        <form class="timeOffForm" action="/test" method="post">
            <label>Start Date:</label>
            <input type="date" name="timeOffStartDate" v-model="startDate" required>
            <br>
            <label>End Date:</label>
            <input type="date" name="timeOffEndDate" v-model="endDate" required>
            <br>
            <label>Type:</label>
            <select name="timeOffType" v-model="type" required>
                <option value="vacation">Vacation</option>
                <option value="sickLeave">Sick Leave</option>
                <option value="personal">Personal</option>
            </select>
            <br>
            <label class="topAlignedLabel">Reason:</label>
            <textarea name="timeOffReason" v-model="reason" required />
            <br>
            <button type="submit" class="submit">Submit</button>
        </form>
    </modal>
</template>

<script>
export default {
    name: 'EmployeeRequestTimeOffModal',
    data: function () {
        return {
            startDate: "",
            endDate: "",
            type: "",
            reason: ""
        }
    },
    methods: {
        hide () {
            this.$modal.hide('requestTimeOff');
            this.$emit('unmountRequestTimeOffModal');
        }
    },
    mounted () {
        this.$modal.show('requestTimeOff');
    }
}
</script>

<style scoped>

.timeOffForm {
    margin-top: 50px;
    text-align: center;
}

label {
    display: inline-block;
    width:100px;
    text-align: left;
    margin-bottom: 20px;
}

label.topAlignedLabel {
    vertical-align: top;
}

input {
    width: 120px;
}

select {
    width: 138px;
    padding: 3px;
}

textarea {
    width: 130px;
    resize: none;
}

br {
    margin-bottom: 40px;
}

.submit {
    background-color: green;
}

.closeButton {
    color: black;
    font-size: 15px;
    float: right;
    margin-top: 10px;
    background-color:white;
    width: 30px;
    margin-right: 20px;
}
h2 {
    margin-top: 50px;
}

</style>