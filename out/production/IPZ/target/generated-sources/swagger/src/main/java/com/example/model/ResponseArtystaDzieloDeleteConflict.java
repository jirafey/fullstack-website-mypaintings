package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseArtystaDzieloDeleteConflict
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseArtystaDzieloDeleteConflict   {
  @JsonProperty("error")
  private String error = null;

  @JsonProperty("current_status")
  private String currentStatus = null;

  public ResponseArtystaDzieloDeleteConflict error(String error) {
    this.error = error;
    return this;
  }

  /**
   * Get error
   * @return error
   **/
  @Schema(example = "Nie można usunąć dzieła, ponieważ jest już zarezerwowane.", description = "")
  
    public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public ResponseArtystaDzieloDeleteConflict currentStatus(String currentStatus) {
    this.currentStatus = currentStatus;
    return this;
  }

  /**
   * Get currentStatus
   * @return currentStatus
   **/
  @Schema(example = "RESERVED", description = "")
  
    public String getCurrentStatus() {
    return currentStatus;
  }

  public void setCurrentStatus(String currentStatus) {
    this.currentStatus = currentStatus;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseArtystaDzieloDeleteConflict responseArtystaDzieloDeleteConflict = (ResponseArtystaDzieloDeleteConflict) o;
    return Objects.equals(this.error, responseArtystaDzieloDeleteConflict.error) &&
        Objects.equals(this.currentStatus, responseArtystaDzieloDeleteConflict.currentStatus);
  }

  @Override
  public int hashCode() {
    return Objects.hash(error, currentStatus);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaDzieloDeleteConflict {\n");
    
    sb.append("    error: ").append(toIndentedString(error)).append("\n");
    sb.append("    currentStatus: ").append(toIndentedString(currentStatus)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
