<?php

	$inData = getRequestInfo();
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];
	

	$conn = new mysqli("localhost", "TheBeast4", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	
	if (strlen($password) < 8)
	{
		returnWithError("Password must be at least 8 characters long");
	}
	
	else
	{	


		$stmt = $conn->prepare("INSERT into Users (firstName,lastName,login,password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		$stmt->execute();
		$stmt->close();
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
		}
		else
		{
		returnWithError("Account created?"); // Account made, no error
		}
		$stmt->close();
		$conn->close();
	}
	
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
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":"Account Created"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>