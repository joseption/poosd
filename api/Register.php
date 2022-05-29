<?php

	$inData = getRequestInfo();
	$FirstName = "";
	$LastName = "";
	$Login= "";
	$Password = "";
	$id = 0;
	

	$conn = new mysqli("localhost", "TheBeast4", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		echo "Connection succesful";
	}
		
        $sql = "INSERT INTO Users(FirstName, LastName, Login, Password)
		VALUES ('$inData["FirstName"]', '$inData["LastName"]', '$inData["Login"]', '$inData["Password"]')";

		if ($conn->query($sql))
		{
			$row = $result->fetch_assoc();
			$FirstName = $row['FirstName'];
			$LastName = $row['LastName'];
			$id = $row['ID'];

			returnWithInfo($FirstName, $LastName, $id);
  		} 	
		else 
		{
			returnWithError("Account Creation Failed");
  		}
		  
		$conn->close();
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>